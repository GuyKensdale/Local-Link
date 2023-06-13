import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { HomepageScreen } from "../Screens/HomepageScreen";
import SignIn from "../Screens/SignIn";
import About from "../Screens/About";
import colours from "../constants/colours";
import Calendar from "../Screens/Calendar";
import LostFound from "../Screens/SignIn";
import ManagementAnnouncements from "../Screens/ManagementAnnouncements";
import Marketplace from "../Screens/Marketplace";
import Recommendations from "../Screens/Recommendations";
import ReportIssue from "../Screens/ReportIssue";
import Header from "./Header";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerTitle: (props) => <Header {...props} />,
        // headerStyle: {
        //   backgroundColor: colours.primary,
        // },
        // headerTintColor: "#fff",
        // headerTitleStyle: {
        //   fontWeight: "bold",
        // },
      }}
    >
      {/* <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Create your account" }}
        /> */}
      <Stack.Screen name="HomepageScreen" component={HomepageScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="LostFound" component={LostFound} />
      <Stack.Screen
        name="ManagementAnnouncements"
        component={ManagementAnnouncements}
      />
      <Stack.Screen name="Marketplace" component={Marketplace} />
      <Stack.Screen name="Recommendations" component={Recommendations} />
      <Stack.Screen name="ReportIssue" component={ReportIssue} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
