import { createDrawerNavigator } from "@react-navigation/drawer";
import colours from "../constants/colours.js";
import About from "../Screens/About";
import Calendar from "../Screens/Calendar";
import FindCommunity from "../Screens/FindCommunity";
import { HomepageScreen } from "../Screens/HomepageScreen";
import ManagementAnnouncements from "../Screens/ManagementAnnouncements";
import Marketplace from "../Screens/Marketplace";
import Recommendations from "../Screens/Recommendations";
import ReportIssue from "../Screens/ReportIssue";
import LostFound from "../Screens/LostFound";
import Header from "./Header";
import SignIn from "../Screens/SignIn";

// import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
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
      <Drawer.Screen name="Home" component={HomepageScreen} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen
        name="ManagementAnnouncements"
        component={ManagementAnnouncements}
      />
      <Drawer.Screen name="ReportIssue" component={ReportIssue} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="LostFound" component={LostFound} />
      <Drawer.Screen name="Marketplace" component={Marketplace} />
      <Drawer.Screen name="Recommendations" component={Recommendations} />
      <Drawer.Screen name="FindCommunity" component={FindCommunity} />
      <Drawer.Screen name="SignIn" component={SignIn} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
