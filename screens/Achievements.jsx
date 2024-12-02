import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../components/consts/colors";
import img from "../assets/loading/achievement.webp";
import url from "../components/route/api";

const Achievements = () => {
  const [achievement, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${url}/api/achievements?populate=image`);
        const data = await res.json();
        setAchievements(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        marginLeft: 20,
        marginVertical: 10,
      }}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {achievement.map((item, index) => {
        const imageUrl =
          item?.attributes?.image?.data?.attributes?.formats?.medium?.url ||
          img;

        return (
          <Pressable key={index}>
            <View style={[styles.card, { marginBottom: 20 }]}>
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={styles.cardImage}
                onError={() => console.log("Error loading image")}
                resizeMode="cover"
              />

              <Text
                style={[
                  {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#f0c35f",
                    marginTop: 5,
                  },
                  { textTransform: "capitalize" },
                ]}
              >
                {item?.attributes?.Title || "Untitled"}
              </Text>

              <Text
                style={{ color: "#A9A9A9", fontSize: 15, marginBottom: 10 }}
              >
                {item?.attributes?.description || "No description available"}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

export default Achievements;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#162c63",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
