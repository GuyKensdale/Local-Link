import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

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
import { auth, db, storage } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../Context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackButton from "../comp/BackButton";
import colours from "../constants/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FormValues {
  itemName: string;
  description: string;

  date: string;
  contactEmail: string;
}

const formSchema = yup.object({
  itemName: yup.string().required().min(4),
  description: yup.string().required().min(4),

  date: yup.string().optional(),
  contactEmail: yup.string().required().email(),
});

const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

const buttonDisabledStyle = {
  backgroundColor: "#CCC",
  borderColor: "#AAA",
};

const FoundItem: React.FC = () => {
  const { userContext } = useContext(MyContext);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const navigation = useNavigation();
  const userEmail = userContext?.email || "";

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
          console.log("File available at", downloadUrl);

          setDownloadUrl(downloadUrl);
          setUploading(false);
          Alert.alert("Photo uploaded");
        });
      }
    );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        itemName: values.itemName,
        description: values.description,
        photoUrl: downloadUrl,
        date: values.date,
        contactEmail: values.contactEmail,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, `${userContext?.communityName}foundItems`), docData);
      resetForm();
      setCurrentImage(null);

      setDownloadUrl("");
      showAlert();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const showAlert = () => {
    Alert.alert("Item Found", "The item has been added successfully.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <>
      <BackButton path="LostFound" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.heading}>Found Item</Text>
          <Formik
            initialValues={{
              itemName: "",
              description: "",
              photoUrl: "",
              date: "",
              contactEmail: userEmail,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<FormValues>) => (
              <View style={styles.form}>
                <Text style={styles.text}>Item Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter item name..."
                  onChangeText={props.handleChange("itemName")}
                  value={props.values.itemName}
                  onBlur={props.handleBlur("itemName")}
                />
                <Text style={styles.errorText}>
                  {props.touched.itemName && props.errors.itemName}
                </Text>
                <Text style={styles.text}>Description:</Text>
                <TextInput
                  multiline
                  minHeight={70}
                  style={styles.input}
                  placeholder="Enter item description..."
                  onChangeText={props.handleChange("description")}
                  value={props.values.description}
                  onBlur={props.handleBlur("description")}
                />
                <Text style={styles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>
                <Text style={styles.text}>Date:</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter event date..."
                  onChangeText={props.handleChange("date")}
                  value={props.values.date}
                  onBlur={props.handleBlur("date")}
                  onFocus={showDatePicker}
                />
                <Text style={styles.errorText}>
                  {props.touched.date && props.errors.date}
                </Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => {
                    props.setFieldValue(
                      "date",
                      date.toISOString().split("T")[0]
                    );
                    hideDatePicker();
                  }}
                  textColor="#000000"
                  onCancel={hideDatePicker}
                />
                <Text style={styles.text}>Contact Email:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("contactEmail")}
                  value={props.values.contactEmail}
                  onBlur={props.handleBlur("contactEmail")}
                />
                <Text style={styles.errorText}>
                  {props.touched.contactEmail && props.errors.contactEmail}
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
                  title="Add Item"
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
                  <Text style={styles.buttonText}>Add Item</Text>
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
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
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

export default FoundItem;
