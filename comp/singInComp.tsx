import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../Context";
interface SignInCompProps {
  userList: {}[];
  onSignIn: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30%",
    backgroundColor: "#F57C01",
  },
  logo: {
    width: 300,
    height: 300,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#1B73E7",
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  switchText: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  errorText: {
    color: "crimson",
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});

const SignIn: React.FC<SignInCompProps> = ({ onSignIn, userList }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const { userContext, setUserContext } = useContext(MyContext);

  const handleAuthAction = () => {
    setError("");

    if (email === "" || password === "") {
      setError("Please enter an email and password");
      return;
    }

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setUserContext({ email: email.toLowerCase() });
          navigation.navigate("ProfileSetup");
          console.log("User creation successful");
        })
        .catch((error) => {
          setError(error.message);
          console.log("User creation error:", error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          let comExist = false;
          let emailExist = false;
          let userExist = false;
          let comName = "";
          let userName = "";
          let userRole = "";
          let postCount = 0;
          console.log(userList);
          for (const user of userList) {
            if (user.email.toLowerCase() === email.toLowerCase()) {
              emailExist = true;
              if (user.userName) {
                userName = user.userName;
                userExist = true;
              }
              if (user.communityName) {
                comName = user.communityName;
                userRole = user.role;
                comExist = true;
              }
              if (user.postCount) {
                postCount = user.postCount;
              }
            }
          }

          if (emailExist && userExist && !comExist) {
            setUserContext({
              email: email.toLowerCase(),
              userName: userName,
            });
          } else if (comExist) {
            setUserContext({
              email: email.toLowerCase(),
              userName: userName,
              communityName: comName,
              role: userRole,
              postCount: postCount,
            });
          } else {
            setUserContext({
              email: email.toLowerCase(),
            });
          }
          console.log("Sign-in successful");
          onSignIn();
          if (!emailExist || !userExist) {
            navigation.navigate("ProfileSetup");
          } else if (!comExist) {
            navigation.navigate("FindCreate");
          } else {
            navigation.navigate("HomepageScreen");
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log("Sign-in error:", error);
        });
    }
  };

  const toggleAuthAction = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
            <Text style={styles.buttonText}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleAuthAction}>
            <Text style={styles.switchText}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
