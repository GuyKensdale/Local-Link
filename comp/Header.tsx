import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import colours from "../constants/colours";

const noPictureUser = require("../assets/icon-user.png");

export default function Header() {
  const [username, setUsername] = useState("");
  const [userIcon, setUserIcon] = useState(noPictureUser);

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const usersQuery = onSnapshot(q, (querySnapshot) => {
      let usersArr: any[] = [];
      querySnapshot.forEach((doc) => usersArr.push(doc.data()));
      setUsername(usersArr[0].username);
      return () => usersQuery();
    });
  }, []);
  useEffect(() => {
    console.log(username);
  }, [username]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo-local-link.png")}
        resizeMode="contain"
      ></Image>
      <View style={styles.user}>
        {!username ? null : (
          <>
            <Text style={styles.user}>{username}!</Text>
            {/* <Image source={userIcon} style={styles.userIcon}></Image> */}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10,
    height: 40,
    backgroundColor: colours.primary,
  },
  logo: {
    width: 90,
    height: 70,
    marginTop: -18,
  },
  user: { alignSelf: "flex-end" },

  userIcon: {},
  //   user: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   }
});
