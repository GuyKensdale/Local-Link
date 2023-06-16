import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colours from "../constants/colours.js";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const routes: NavigationItem[] = [
  { id: 1, title: "I'm a resident", screen: "FindCommunity" },
  { id: 2, title: "I want to create a community", screen: "CreateCommunity" },
];

export const FindCreate: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLinkPress = (item: NavigationItem) => {
    navigation.push(item.screen);
  };

  const renderItem = ({ item }: { item: NavigationItem }) => (
    <TouchableOpacity
      onPress={() => handleLinkPress(item)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

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
      // textDecoration: "none",
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        {routes.map((item) => (
          <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
        ))}
      </View>
    </View>
  );
};