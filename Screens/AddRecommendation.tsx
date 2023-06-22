import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikProps } from "formik";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../Context";
import colours from "../constants/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

const buttonDisabledStyle = {
  backgroundColor: "#CCC",
  borderColor: "#AAA",
};

interface FormValues {
  name: string;
  description: string;
  website: string;
  phoneNumber: string;
  category: string;
  image: string;
}

const formSchema = yup.object({
  name: yup.string().required().min(4),
  description: yup.string().min(4),
  website: yup.string().url(),
  phoneNumber: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().url(),
});

const categories = [
  "Maintenance services",
  "Restaurants",
  "Child-friendly",
  "General services",
];

const AddRecommendation: React.FC = () => {
  const { userContext } = useContext(MyContext);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const navigation = useNavigation();
  const userEmail = userContext?.email || "";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const source = { uri: result.uri };
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
          console.log("File available at", downloadUrl);
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
        name: values.name,
        description: values.description,
        website: values.website,
        phoneNumber: values.phoneNumber,
        category: values.category,
        image: downloadUrl,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "recommendations"), docData);
      resetForm();
      setCurrentImage(null);
      setSubmitted(true);
      setDownloadUrl("");
      showAlert();
      console.log("form submitted");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Recommendation added",
      "The recommendation has been added successfully.",
      [{ text: "OK", onPress: () => navigation.navigate("Recommendations") }]
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.heading}>Add Recommendation</Text>
          <Formik
            initialValues={{
              name: "",
              description: "",
              website: "",
              phoneNumber: "",
              category: "",
              image: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<FormValues>) => (
              <View style={styles.form}>
                <Text style={styles.text}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name..."
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={styles.errorText}>
                  {props.touched.name && props.errors.name}
                </Text>

                <Text style={styles.text}>Description:</Text>
                <TextInput
                  multiline
                  minHeight={70}
                  style={styles.input}
                  placeholder="Enter description..."
                  onChangeText={props.handleChange("description")}
                  value={props.values.description}
                  onBlur={props.handleBlur("description")}
                />
                <Text style={styles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>

                <Text style={styles.text}>Website:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter website URL..."
                  onChangeText={props.handleChange("website")}
                  value={props.values.website}
                  onBlur={props.handleBlur("website")}
                />
                <Text style={styles.errorText}>
                  {props.touched.website && props.errors.website}
                </Text>

                <Text style={styles.text}>Phone Number:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number..."
                  onChangeText={props.handleChange("phoneNumber")}
                  value={props.values.phoneNumber}
                  onBlur={props.handleBlur("phoneNumber")}
                  keyboardType="phone-pad"
                />
                <Text style={styles.errorText}>
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                  <View style={styles.categoryInput}>
                    <Text style={styles.categoryText}>
                      {selectedCategory || "Select a category"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
                {showPicker && (
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setShowPicker(false);
                    }}
                  >
                    <Picker.Item
                      label="Maintenance services"
                      value="Maintenance services"
                    />
                    <Picker.Item label="Restaurants" value="Restaurants" />
                    <Picker.Item
                      label="Child-friendly"
                      value="Child-friendly"
                    />
                    <Picker.Item
                      label="General services"
                      value="General services"
                    />
                  </Picker>
                )}

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
                      <Image
                        source={currentImage}
                        style={styles.selectedImage}
                      />
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
                  title="Add Event"
                  onPress={props.handleSubmit}
                  style={[
                    styles.button,
                    isButtonPressed ? buttonPressedStyle : null,
                  ]}
                  onPressIn={() => setButtonPressed(true)}
                  onPressOut={() => setButtonPressed(false)}
                  activeOpacity={1}
                >
                  <Text style={styles.buttonText}>Add Event</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  form: {
    alignSelf: "stretch",
    margin: 10,
  },
  text: {
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
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
    fontFamily: "Poppins_400Regular",
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

export default AddRecommendation;
