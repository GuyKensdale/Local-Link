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
import StackNavigator from "./StackNavigator";

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
        name="Management Announcements"
        component={ManagementAnnouncements}
      />
      <Drawer.Screen name="Report Issues" component={ReportIssue} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="Lost Found" component={LostFound} />
      <Drawer.Screen name="Marketplace" component={Marketplace} />
      <Drawer.Screen name="Recommendations" component={Recommendations} />
      <Drawer.Screen name="FindCommunity" component={FindCommunity} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
