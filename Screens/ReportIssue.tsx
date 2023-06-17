import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection } from "@firebase/firestore";
import * as yup from "yup";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins"

// setting type for TS
interface FormValues {
  title: string;
  description: string;
  email: string;
  img: string;
}

// Setting the rules for form validation
const formSchema = yup.object({
  title: yup.string().required().min(4),
  description: yup.string().required().min(4),
  email: yup.string().email().required(),
  img: yup.string().min(4),
});

//Setting the button colour when it's pressed
const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

export default function ReportIssue({ navigation }: any) {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        title: values.title,
        description: values.description,
        email: values.email,
        img: values.img,
      };

      await addDoc(collection(db, "reportedIssues"), docData);
      console.log("Document written successfully");
      resetForm();
      setSubmitted(true);
      showAlert();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Setting up the alert message after the form has been submitted
  const showAlert = () => {
    Alert.alert(
      "Your form has been submitted!",
      "Someone from management will be in touch as soon as possible.",
      [{ text: 'OK!', onPress: () => console.log('OK pressed')}],
      { cancelable: false }
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Report an Issue</Text>
          <Formik
            initialValues={{ title: "", description: "", email: "",  img: "" }}
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
                  onChangeText={(text) =>
                    props.handleChange("description")(text)
                  }
                  value={props.values.description}
                  onBlur={props.handleBlur("description")}
                />
                <Text style={styles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>
                <Text style={styles.text}>Your email: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="example@example.com"
                  onChangeText={(text) => props.handleChange("email")(text)}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text style={styles.errorText}>
                  {props.touched.email && props.errors.email}
                </Text>
                <Text style={styles.text}>Image URL <Text style={styles.optionalText}>(optional)</Text>:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Image URL..."
                  onChangeText={(text) => props.handleChange("img")(text)}
                  value={props.values.img}
                  onBlur={props.handleBlur("img")}
                />
                <Text style={styles.errorText}>
                  {props.touched.img && props.errors.img}
                </Text>
                <TouchableOpacity
                  title="submit!"
                  onPress={props.handleSubmit}
                  style={[
                    styles.button,
                    isButtonPressed ? buttonPressedStyle : null,
                  ]}
                  onPressIn={() => setButtonPressed(true)}
                  onPressOut={() => setButtonPressed(false)}
                  activeOpacity={1}
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
    fontFamily: 'Poppins_400Regular',
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
    fontFamily: 'Poppins_400Regular',
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
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
});
