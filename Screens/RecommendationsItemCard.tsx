import React from "react";
import { Text, View, StyleSheet, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackButton from "../comp/BackButton";
import colours from "../constants/colours";

const RecommendationsItemCard: React.FC<{ route: any }> = ({ route }) => {
  const { item } = route.params;
  const { name, photoUrl, description, contacts, website } = item;

  return (
    <>
      <BackButton path="Recommendations" />

      <View style={styles.container}>
        <Text style={styles.heading}>{name}</Text>
        <Image source={{ uri: photoUrl }} style={styles.itemImage} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>

          <Text style={styles.description}>{website}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  itemImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#F4C01D",
  },
  descriptionContainer: {
    backgroundColor: "white",
    width: "85%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 8,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 5,
  },
  date: {
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    fontStyle: "italic",
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: 10,
  },
  contactEmail: {
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
  contactText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  button: {
    width: "100%",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: colours.secondary,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: colours.secondary,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});

export default RecommendationsItemCard;
