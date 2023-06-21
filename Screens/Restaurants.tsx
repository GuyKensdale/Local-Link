import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../comp/BackButton";

const Restaurants: React.FC = () => {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(db, "marketplace"),
      orderBy("timestamp", "desc")
    );

    const itemsQuery = onSnapshot(q, (querySnapshot) => {
      const items = [];

      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setItemList(items);
      setIsLoading(false);
    });

    return () => itemsQuery();
  }, []);

  const handleListItemPress = () => {
    navigation.navigate("ListItem");
  };

  const handleItemPress = (item: any) => {
    navigation.navigate("MarketplaceItemCard", { item });
  };

  return (
    <>
      <BackButton path="HomepageScreen" />
      <TouchableOpacity
        onPress={() => handleListItemPress()}
        style={styles.button}
      >
        <Text style={styles.listItemText}>List your item</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <Text style={styles.heading}>Marketplace</Text>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            itemList.map((item: any, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => handleItemPress(item)}
                >
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  <Image
                    source={{ uri: item.photoUrl }}
                    style={styles.itemImage}
                  />

                  <Text style={styles.date}>{item.date}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  itemName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    marginBottom: 10,
  },
  itemImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#F4C01D",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 5,
  },
  date: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 5,
  },
  contactEmail: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  listItemText: {
    color: "white",
  },
  button: {
    // width: "100%",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: "#1B73E7",
  },
});

export default Restaurants;
