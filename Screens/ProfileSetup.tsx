import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { auth, db } from "../config/firebase";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import * as yup from "yup";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
// setting type for TS
interface FormValues {
  userName: string;
}

// Setting the rules for form validation
const formSchema = yup.object({
  userName: yup.string().required().min(3),
});

//Setting the button colour when it's pressed
const buttonPressedStyle = {
  backgroundColor: "#F57C01",
  borderColor: "#F57C01",
};

export default function ProfileSetup({ navigation }: any) {
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const docData = {
        userName: values.userName,
        email: auth.currentUser?.email,
      };
      const tempEmail = auth.currentUser?.email;
      const createUserRef = doc(db, "Users", `${tempEmail}`);
      await setDoc(createUserRef, docData);
      console.log("User added!");
      resetForm();
      setSubmitted(true);
      showAlert();
      navigation.navigate("FindCreate");
    } catch (error) {
      console.error("Error adding User: ", error);
    }
  };

  // Setting up the alert message after the form has been submitted
  const showAlert = () => {
    Alert.alert(
      "User Created",
      "User Created",
      [{ text: "OK!", onPress: () => console.log("OK pressed") }],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile Setup</Text>
        <Formik
          initialValues={{ userName: "" }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<FormValues>) => (
            <View style={styles.form}>
              <Text style={styles.text}>Username: </Text>
              <TextInput
                style={styles.input}
                placeholder="userName"
                onChangeText={(text) => props.handleChange("userName")(text)}
                value={props.values.userName}
                onBlur={props.handleBlur("userName")}
              />
              <Text style={styles.errorText}>
                {props.touched.userName && props.errors.userName}
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
