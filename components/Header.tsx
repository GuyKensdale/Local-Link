import { Text, View, StyleSheet, Button, Image } from "react-native";
import colours from "../constants/colours";

export default function Header({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10,
    height: 60,
    backgroundColor: colours.primary,
  },
  logo: {
    width: 50,
    height: 50,
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
