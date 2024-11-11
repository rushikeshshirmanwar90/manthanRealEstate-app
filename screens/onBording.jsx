import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
} from "react-native";
import COLORS from "../components/consts/colors";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase/config";

const OnBoardScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [userId, loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />

      <Image
        source={require("../assets/images/onboardImage.jpg")}
        style={style.image}
      />

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View>
          <Text style={style.title}>Discover homes that inspire You,</Text>
          <Text style={style.title}>On A Single Click</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 40,
        }}
      >
        {!loading && userId ? (
          <Pressable onPress={() => navigation.replace("Register")}>
            <View style={style.btn}>
              <Text style={{ color: "white", fontSize: 20 }}>Get Started</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.replace("Home")}>
            <View style={style.btn}>
              <Text style={{ color: "white", fontSize: 20 }}>Get Started</Text>
            </View>
          </Pressable>
        )}

        <TouchableOpacity
          style={{
            marginTop: 10,
          }}
          onPress={() => {
            Linking.openURL("tel:+919579896842").catch(() => {
              Alert.alert("Something went wrong..!");
            });
          }}
        >
          <Text
            style={{
              color: "#455ff5",
              fontSize: 16,
              textAlign: "center",
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Developed By Rushikesh Shrimanwar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 420,
    width: "100%",
    borderBottomLeftRadius: 100,
  },
  indicatorContainer: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 30, fontWeight: "bold" },
  textStyle: { fontSize: 16, color: COLORS.grey },
});

export default OnBoardScreen;
