import { StyleSheet, Text, View } from "react-native";
import SignInPage from "./Screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import CreateCommunity from "./Screens/CreateCommunity";
import PostAnnouncement from "./Screens/PostAnnouncement";
import { Communities } from "./Screens/Communities";
import { QueryClient, QueryClientProvider } from "react-query";
import ProfileSetup from "./Screens/ProfileSetup";
import Header from "./comp/Header";
import Chat from "./Screens/Chat";
import FindCreate from "./Screens/FindCreate";
import colours from "./constants/colours";
import Header from "./comp/Header";
import colours from "./constants/colours";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
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
          {/* <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Create your account" }}
        /> */}
          <Stack.Screen
            name="HomepageScreen"
            component={HomepageScreen}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="ProfileSetup"
            component={ProfileSetup}
            options={{ title: "ProfileSetup" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInPage}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="LostFound"
            component={LostFound}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="ManagementAnnouncements"
            component={ManagementAnnouncements}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="Marketplace"
            component={Marketplace}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="Recommendations"
            component={Recommendations}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="ReportIssue"
            component={ReportIssue}
            options={{ title: "Create your account" }}
          />
          <Stack.Screen
            name="FindCommunity"
            component={FindCommunity}
            options={{ title: "Find Community" }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: "Chat" }}
          />
          <Stack.Screen
            name="CreateCommunity"
            component={CreateCommunity}
            options={{ title: "Create a Community" }}
          />
          <Stack.Screen
            name="FindCreate"
            component={FindCreate}
            options={{ title: "FindCreate" }}
          />
          <Stack.Screen
            name="PostAnnouncement"
            component={PostAnnouncement}
            options={{ title: "Post an Announcement" }}
          />
          <Stack.Screen
            name="Communities"
            component={Communities}
            options={{ title: "Communities" }}
          />
        </Stack.Navigator>
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
