import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import colours from "../constants/colours.js";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const routes: NavigationItem[] = [
  { id: 1, title: "About", screen: "About" },
  {
    id: 2,
    title: "Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 3, title: "Report Issue", screen: "ReportIssue" },
  { id: 4, title: "Calendar", screen: "Calendar" },
  { id: 5, title: "Lost Found", screen: "LostFound" },
  { id: 6, title: "Marketplace", screen: "Marketplace" },
  { id: 7, title: "Recommendations", screen: "Recommendations" },
  { id: 8, title: "Sign In", screen: "SignIn" },
  { id: 9, title: "Find Community", screen: "FindCommunity" },
];

export const HomepageScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLinkPress = (item: NavigationItem) => {
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

  const renderItem = ({ item }: { item: NavigationItem }) => (
    <TouchableOpacity
      onPress={() => handleLinkPress(item)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Welcome to COMMUNITY_NAME!</Text>
      <View style={styles.containerList}>
        {routes.map((item) => (
          <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h2: {
    flex: 0.5,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    height: 120,
    width: "40%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 18,
    color: "white",
  },
});
