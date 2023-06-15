import { StyleSheet, Text, View } from "react-native";
import SignInPage from "./Screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import SignUp from "./Screens/SignUp";
import { HomepageScreen } from "./Screens/HomepageScreen";
import About from "./Screens/About";
import CalendarScreen from "./Screens/Calendar";
import LostFound from "./Screens/LostFound";
import ManagementAnnouncements from "./Screens/ManagementAnnouncements";
import Marketplace from "./Screens/Marketplace";
import Recommendations from "./Screens/Recommendations";
import ReportIssue from "./Screens/ReportIssue";
import FindCommunity from "./Screens/FindCommunity";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./comp/Header";
import colours from "./constants/colours";

const queryClient = new QueryClient();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomepageScreen"
          screenOptions={{
            headerTitle: () => <Header />,
            headerStyle: {
              backgroundColor: colours.primary,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Drawer.Screen
            name="HomepageScreen"
            component={HomepageScreen}
            options={{ title: "Home" }}
          />
          <Drawer.Screen
            name="SignIn"
            component={SignInPage}
            options={{ title: "Sign In" }}
          />
          <Drawer.Screen
            name="About"
            component={About}
            options={{ title: "About" }}
          />
          <Drawer.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{ title: "Calendar" }}
          />
          <Drawer.Screen
            name="LostFound"
            component={LostFound}
            options={{ title: "Lost & Found" }}
          />
          <Drawer.Screen
            name="ManagementAnnouncements"
            component={ManagementAnnouncements}
            options={{ title: "Management Announcements" }}
          />
          <Drawer.Screen
            name="Marketplace"
            component={Marketplace}
            options={{ title: "Marketplace" }}
          />
          <Drawer.Screen
            name="Recommendations"
            component={Recommendations}
            options={{ title: "Recommendations" }}
          />
          <Drawer.Screen
            name="ReportIssue"
            component={ReportIssue}
            options={{ title: "Report Issue" }}
          />
          <Drawer.Screen
            name="FindCommunity"
            component={FindCommunity}
            options={{ title: "Find Community" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
