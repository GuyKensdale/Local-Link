import { Text, View, StyleSheet, Button, Image } from "react-native";

export default function Header({ navigation }: any) {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/logo.png")}
    ></Image>
  );
}

const styles = StyleSheet.create({
  sign_in: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// function LogoTitle() {
//     return (
//       <Image
//         style={{ width: 50, height: 50 }}
//         source={require('@expo/snack-static/react-native-logo.png')}
//       />
//     );
//   }
