import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colours from "../constants/colours";

// NEED TO TRY FIX TYPSCRIPT ISSUE WITH PREDEFINED TYPE FOR COMMUNITY IN MAP
// type ExampleObject = {
//   name: string;
//   location: string;
//   description: string;
// };

export default function FindCommunity() {
  const [communityList, setCommunityList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredArr, setFilteredArr] = useState([{}]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "CommunityList"), orderBy("name"));

    const communityQuery = onSnapshot(q, (querySnapshot) => {
      let communityArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        communityArr.push({ ...doc.data(), id: doc.id });
      });
      setCommunityList(communityArr);
      setIsLoading(false);
    });

    return () => communityQuery();
  }, []);

  const handleClick = () => {
    setFilteredArr(
      communityList.filter((community: any) => {
        console.log(searchInput);
        if (community.name.includes(searchInput)) {
          return community;
        }
      })
    );
    setSearchClicked(true);
  };

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={setSearchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleClick}>
          <Text>Search Communities</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        {searchClicked ? (
          filteredArr[0] === undefined ? (
            <Text>No Results Found</Text>
          ) : (
            filteredArr.map((community: any, index) => {
              return (
                // NEED TO ADD ONCLICK HERE TO NAVIGATE
                <TouchableOpacity key={index} style={styles.itemContainer}>
                  <Text>{community.name}</Text>
                </TouchableOpacity>
              );
            })
          )
        ) : (
          communityList.map((community: any, index) => {
            return (
              // NEED TO ADD ONCLICK HERE TO NAVIGATE
              <TouchableOpacity key={index} style={styles.itemContainer}>
                <Text>{community.name}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    width: "40%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: "lightblue",
    width: 300,
  },
  searchButton: {
    height: 30,
    width: "40%",
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
