import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { db, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "@firebase/firestore";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../constants/colours";

interface FormValues {
  title: string;
  description: string;
  email: string;
  img: string;
}

const formSchema = yup.object({
  title: yup.string().required().min(4),
  description: yup.string().required().min(4),
  email: yup.string().email().required(),
  img: yup.string().min(4),
});

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

const buttonDisabledStyle = {
  backgroundColor: "#CCC",
  borderColor: "#AAA",
};

export default function ReportIssue({ navigation }: any) {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };

      setCurrentImage(source);
      handleUploadImage(source);
    }
  };

  const handleUploadImage = async (image) => {
    if (!image) return;

    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Upload is ${progress}% complete`);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setDownloadUrl(downloadUrl);
          setUploading(false);
          Alert.alert("Photo uploaded");
        });
      }
    );
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        title: values.title,
        description: values.description,
        email: values.email,
        photoUrl: downloadUrl,
      };

      await addDoc(collection(db, "reportedIssues"), docData);

      resetForm();
      setCurrentImage(null);
      setSubmitted(true);
      setDownloadUrl("");
      showAlert();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Your form has been submitted!",
      "Someone from management will be in touch as soon as possible.",
      [{ text: "OK!", onPress: () => console.log("OK pressed") }],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Report an Issue</Text>
        <Formik
          initialValues={{ title: "", description: "", email: "", img: "" }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<FormValues>) => (
            <View style={styles.form}>
              <Text style={styles.text}>Title: </Text>
              <TextInput
                style={styles.input}
                placeholder="issue title..."
                onChangeText={(text) => props.handleChange("title")(text)}
                value={props.values.title}
                onBlur={props.handleBlur("title")}
              />
              <Text style={styles.errorText}>
                {props.touched.title && props.errors.title}
              </Text>
              <Text style={styles.text}>Issue Description: </Text>
              <TextInput
                multiline
                minHeight={70}
                style={styles.input}
                placeholder="describe the issue... "
                onChangeText={(text) => props.handleChange("description")(text)}
                value={props.values.description}
                onBlur={props.handleBlur("description")}
              />
              <Text style={styles.errorText}>
                {props.touched.description && props.errors.description}
              </Text>
              <Text style={styles.text}>Your email: </Text>
              <TextInput
                style={styles.input}
                placeholder="example@example.com "
                onChangeText={(text) => props.handleChange("email")(text)}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text style={styles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>

              <View style={styles.buttonsWrapper}>
                {!currentImage && (
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.pickImage}
                  >
                    <MaterialCommunityIcons
                      name="file-upload-outline"
                      size={24}
                      color={colours.font}
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonTextUpload}>Pick Image</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.imageViewWrapper}>
                <View style={styles.imageViewUploadWrapper}>
                  {currentImage && (
                    <Image source={currentImage} style={styles.selectedImage} />
                  )}
                  {uploading && (
                    <ActivityIndicator
                      size="large"
                      color={colours.secondary}
                      style={styles.loading}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                title="submit!"
                onPress={props.handleSubmit}
                style={[
                  styles.button,
                  isButtonPressed
                    ? buttonPressedStyle
                    : uploading
                    ? buttonDisabledStyle
                    : null,
                ]}
                onPressIn={() => setButtonPressed(true)}
                onPressOut={() => setButtonPressed(false)}
                activeOpacity={1}
                disabled={uploading}
              >
                <Text style={styles.buttonText}>Submit!</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  form: {
    margin: 10,
    fontFamily: "Poppins_500Medium",
  },
  text: {
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
  optionalText: {
    color: "gray",
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 0,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    fontSize: 12,
    borderRadius: 6,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: "#1B73E7",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
  textSubmitted: {
    textAlign: "center",
    margin: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  pickImage: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    borderStyle: "dashed",
    borderColor: colours.font,
    borderWidth: 1,
    borderRadius: 4,
  },
  pickImageView: {
    width: 200,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    borderColor: colours.font,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonTextUpload: {
    color: colours.font,
  },
  buttonsWrapper: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageViewWrapper: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageViewUploadWrapper: {
    position: "relative",
  },
  loading: {
    position: "absolute",
    left: 50,
    top: 50,
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
});
