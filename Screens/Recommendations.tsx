import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import colours from "../constants/colours.js";
import { MyContext } from "../Context";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const routes: NavigationItem[] = [
  {
    id: 1,
    title: "Maintenance services",
    screen: "MaintenanceServices",
  },
  { id: 2, title: "Restaurants", screen: "Restaurants" },
  //   { id: 3, title: "💬 General Chat", screen: "Chat" },
  //   { id: 4, title: "📆 Calendar", screen: "Calendar" },
  //   { id: 5, title: "🛍️ Marketplace", screen: "Marketplace" },
  //   { id: 6, title: "📝 Recommendations", screen: "Recommendations" },
  //   { id: 7, title: "🔎 Lost & Found", screen: "LostFound" },
  //   { id: 8, title: "🔧 Report Issue", screen: "ReportIssue" },
  //   { id: 9, title: "📣 Post Announcement", screen: "PostAnnouncement" },
  //   { id: 10, title: "🎖️ Assign Admins", screen: "AssignAdmins" },
];

export const Recommendations: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { userContext, setUserContext } = useContext(MyContext);
  const handleLinkPress = (item: NavigationItem) => {
    console.log(item.screen);
    if (item.screen === "HomepageScreen") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: item.screen }],
        })
      );
    } else {
      navigation.navigate(item.screen);
    }
  };

  const colours = ["#1B73E7", "#eab20b", "#FF8A64"];
  const renderItem = ({ item }: { item: NavigationItem }) => {
    const backgroundColor = colours[item.id % colours.length];
    const itemContainerStyle = {
      ...styles.itemContainer,
      backgroundColor,
    };

    return (
      <TouchableOpacity
        onPress={() => handleLinkPress(item)}
        style={itemContainerStyle}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h2}>Recommendations</Text>

        <View style={styles.containerList}>
          {routes.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h2: {
    flex: 0.5,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins_700Bold",
    marginTop: 50,
    marginBottom: 50,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  containerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    height: 120,
    width: "85%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textTransform: "lowercase",
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
