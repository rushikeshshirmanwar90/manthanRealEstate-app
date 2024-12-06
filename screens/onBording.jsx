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
import url from "../components/route/api";

const OnBoardScreen = () => {
  const navigation = useNavigation();
  const [isUser, setIsUser] = useState(false);
  const [storedName, setStoredName] = useState("There");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (!userId) return;
      try {
        console.log(userId);
        const res = await fetch(
          `${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`
        );
        const data = await res.json();
        const tmpUserType = data.data[0]?.attributes?.user_type || "";
        const name = data.data[0]?.attributes.name || "";
        setStoredName(name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true);
      }
    });
    return unsubscribe;
  }, [isUser]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />

      <Image
        source={require("../assets/images/onboardImage.jpg")}
        style={style.image}
      />

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View>
          <Text style={style.title}>
            <Text style={({ fontStyle: "italic" }, style.title)}>Hey</Text>{" "}
            {storedName},
          </Text>
          <Text style={style.title}>Welcome to Manthan Infracare.</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 40,
        }}
      >
        <Pressable onPress={() => navigation.replace("Register")}>
          <View style={style.btn}>
            <Text
              style={{ color: COLORS.golden, fontSize: 20, fontWeight: 600 }}
            >
              Get Started
            </Text>
          </View>
        </Pressable>

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
              color: COLORS.grey,
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
    borderColor: COLORS.golden,
    borderWidth: 2.7,
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
    backgroundColor: "#0a2159",
    borderWidth: 1,
    borderColor: "#f0c35f",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 25, fontWeight: "bold", color: COLORS.golden },
  textStyle: { fontSize: 16, color: COLORS.grey },
});

export default OnBoardScreen;
