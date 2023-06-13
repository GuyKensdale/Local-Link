import { createDrawerNavigator } from "@react-navigation/drawer";
import colours from "../constants/colours.js";
import About from "../Screens/About";
import Calendar from "../Screens/Calendar";
import FindCommunity from "../Screens/FindCommunity";
import ManagementAnnouncements from "../Screens/ManagementAnnouncements";
import Marketplace from "../Screens/Marketplace";
import Recommendations from "../Screens/Recommendations";
import ReportIssue from "../Screens/ReportIssue";
import LostFound from "../Screens/SignIn";
import Header from "./Header";
import StackNavigator from "./StackNavigator";
// Import other screens or navigators

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
        headerStyle: {
          backgroundColor: colours.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="About your Community" component={About} />
      <Drawer.Screen
        name="Management Announcements"
        component={ManagementAnnouncements}
      />
      <Drawer.Screen name="Report Issues" component={ReportIssue} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="Lost & Found" component={LostFound} />
      <Drawer.Screen name="Marketplace" component={Marketplace} />
      <Drawer.Screen name="Recommendations" component={Recommendations} />
      <Drawer.Screen name="Find Community" component={FindCommunity} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
