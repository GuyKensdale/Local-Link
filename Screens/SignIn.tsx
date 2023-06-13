import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const user = response.user;

      // Save user data to the Firestore database
      await firestore().collection("users").doc(user.uid).set({
        email: user.email,
        // Add more user data fields as needed
      });

      console.log("User signed in:", user);
    } catch (error: any) {
      const errorMessage = (error as { message: string }).message;
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignInScreen;
