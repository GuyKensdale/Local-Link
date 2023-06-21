import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../comp/BackButton";

interface RecommendationsCategoryProps {
  category: string;
}

const RecommendationsCategory: React.FC<RecommendationsCategoryProps> = ({
  category,
}) => {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(db, "recommendations"),
      orderBy("timestamp", "desc"),
      where("category", "==", category)
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
  }, [category]);

  const handleListItemPress = () => {
    navigation.navigate("ListItem");
  };

  const handleItemPress = (item: any) => {
    navigation.navigate("RecommendationsItemCard", { item });
  };

  return (
    <>
      <BackButton path="Recommendations" />
      <TouchableOpacity
        onPress={() => handleListItemPress()}
        style={styles.button}
      >
        <Text style={styles.listItemText}>Add your recommendation</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <Text style={styles.heading}>{category}</Text>
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
    marginBottom: 25,
    borderColor: "#1B73E7",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});

export default RecommendationsCategory;
