import "react-native-gesture-handler";

import SignInPage from "./Screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomepageScreen } from "./Screens/HomepageScreen";
import About from "./Screens/About";
import CalendarScreen from "./Screens/Calendar";
import LostFound from "./Screens/LostFound";
import ManagementAnnouncements from "./Screens/ManagementAnnouncements";
import Marketplace from "./Screens/Marketplace";
import { Recommendations } from "./Screens/Recommendations";
import ReportIssue from "./Screens/ReportIssue";
import FindCommunity from "./Screens/FindCommunity";
import CreateCommunity from "./Screens/CreateCommunity";
import PostAnnouncement from "./Screens/PostAnnouncement";
import EditProfile from "./Screens/EditProfile";
import AddEvent from "./Screens/AddEvent";
import { QueryClient, QueryClientProvider } from "react-query";
import ProfileSetup from "./Screens/ProfileSetup";
import Header from "./comp/Header";

import HeaderRight from "./comp/HeaderRight";
import GeneralChat from "./Screens/GeneralChat";
import { FindCreate } from "./Screens/FindCreate";
import colours from "./constants/colours";
import { useFonts } from "expo-font";
import { MyContext } from "./Context";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import React, { useState } from "react";
import AssignAdmins from "./Screens/AssignAdminsPage";
import LostItems from "./Screens/LostItems";
import FoundItem from "./Screens/FoundItem";
import LostItemCard from "./Screens/LostItemCard";

import MarketplaceItemCard from "./Screens/MarketplaceItemCard";
import ListItem from "./Screens/ListItem";

import { Ionicons } from "@expo/vector-icons";
import MaintenanceServices from "./Screens/MaintenanceServices";
import Restaurants from "./Screens/Restaurants";
import RecommendationsItemCard from "./Screens/RecommendationsItemCard";
import AddRecommendation from "./Screens/AddRecommendation";

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [userContext, setUserContext] = useState({});
  // const [adminRole, setAdminRole] = useState("none");
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider value={{ userContext, setUserContext }}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="SignIn"
            screenOptions={{
              headerTitle: () => <Header />,
              headerRight: () => <HeaderRight />,
              headerStyle: {
                backgroundColor: colours.primary,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              drawerLabelStyle: {
                fontFamily: "Poppins_500Medium",
              },
              drawerContentContainerStyle: {
                backgroundColor: colours.primary,
              },
              drawerActiveTintColor: "black",
              drawerInactiveTintColor: "white",
              drawerActiveBackgroundColor: "white",
            }}
          >
            <Drawer.Screen
              name="HomepageScreen"
              component={HomepageScreen}
              options={{ title: "🏠 Community Homepage" }}
            />
            <Drawer.Screen
              name="ProfileSetup"
              component={ProfileSetup}
              options={{ title: "👤 Profile" }}
            />
            <Drawer.Screen
              name="About"
              component={About}
              options={{ title: "ℹ️ About Community" }}
            />
            <Drawer.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{ title: "📆 Calendar" }}
            />
            <Drawer.Screen
              name="LostFound"
              component={LostFound}
              options={{ title: "🔎 Lost & Found" }}
            />
            <Drawer.Screen
              name="ManagementAnnouncements"
              component={ManagementAnnouncements}
              options={{ title: "📯 Announcements" }}
            />
            <Drawer.Screen
              name="Marketplace"
              component={Marketplace}
              options={{ title: "🛍️ Marketplace" }}
            />
            <Drawer.Screen
              name="Recommendations"
              component={Recommendations}
              options={{ title: "📝 Recommendations" }}
            />
            <Drawer.Screen
              name="ReportIssue"
              component={ReportIssue}
              options={{ title: "🔧 Report an Issue" }}
            />
            <Drawer.Screen
              name="Chat"
              component={GeneralChat}
              options={{ title: "💬 Chat" }}
            />
            <Drawer.Screen
              name="FindCommunity"
              component={FindCommunity}
              options={{ title: "Find Community" }}
            />
            <Drawer.Screen
              name="CreateCommunity"
              component={CreateCommunity}
              options={{ title: "Create a Community" }}
            />
            <Drawer.Screen
              name="FindCreate"
              component={FindCreate}
              options={{ title: "FindCreate" }}
            />
            <Drawer.Screen
              name="SignIn"
              component={SignInPage}
              options={{ title: "SignOut" }}
            />
            <Drawer.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ title: "EditProfile" }}
            />

            <Drawer.Screen
              name="PostAnnouncement"
              component={PostAnnouncement}
              options={{
                title: "Post an Announcement",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="AssignAdmins"
              component={AssignAdmins}
              options={{
                title: "assignAdmins",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="AddEvent"
              component={AddEvent}
              options={{
                title: "AddEvent",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="LostItems"
              component={LostItems}
              options={{
                title: "Looking for items",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="FoundItem"
              component={FoundItem}
              options={{
                title: "Found an item",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="LostItemCard"
              component={LostItemCard}
              options={{
                title: "Lost Item Card",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="MarketplaceItemCard"
              component={MarketplaceItemCard}
              options={{
                title: "MarketplaceItemCard",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="ListItem"
              component={ListItem}
              options={{
                title: "ListItem",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />

            <Drawer.Screen
              name="MaintenanceServices"
              component={MaintenanceServices}
              options={{
                title: "MaintenanceServices",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="Restaurants"
              component={Restaurants}
              options={{
                title: "Restaurants",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="RecommendationsItemCard"
              component={RecommendationsItemCard}
              options={{
                title: "RecommendationsItemCard",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
            <Drawer.Screen
              name="AddRecommendation"
              component={AddRecommendation}
              options={{
                title: "AddRecommendation",
                drawerItemStyle: {
                  display: "none",
                },
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </QueryClientProvider>
  );
}
//push
