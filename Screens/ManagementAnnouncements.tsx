import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context";

export default function ManagementAnnouncements({ navigation }: any) {
  const [announcementList, setAnnouncementList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const { userContext } = useContext(MyContext);

  useEffect(() => {
    const q = query(
      collection(db, `${userContext?.communityName}postAdminAnnouncement`),
      orderBy("timestamp", "desc")
    );

    const announcementQuery = onSnapshot(q, (querySnapshot) => {
      let announcementArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        announcementArr.push({ ...doc.data(), id: doc.id });
      });
      setAnnouncementList(announcementArr);
      setIsLoading(false);
    });

    return () => announcementQuery();
  }, []);

  return (
    <ScrollView scrollIndicatorInsets={{right: 1}}>
      <View>
        <Text style={styles.heading}> Management Announcements</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          announcementList.map((announcement: any, index) => {
            return (
              <View key={announcement.id} style={styles.postBody}>
                <Text style={styles.title}>{announcement.title}</Text>
                <Image
                  source={{ uri: announcement.img }}
                  style={styles.postImg}
                />
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    {announcement.description}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  postBody: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginLeft: 15,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  postImg: {
    width: 370,
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#F4C01D",
    alignSelf: "center",
  },
  description: {
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
    textAlign: "justify",
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  descriptionContainer: {
    backgroundColor: "white",
    width: "85%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 8,
  },
});
