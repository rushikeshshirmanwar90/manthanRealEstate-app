import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import COLORS from "../components/consts/colors";
import { useNavigation } from "@react-navigation/core";

const OnBoardScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />

      <Image
        source={require("../assets/images/onboardImage.jpg")}
        style={style.image}
      />

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View>
          <Text style={style.title}>Find your</Text>
          <Text style={style.title}>sweet home</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={style.textStyle}>
            Schedule visits in just a few clicks
          </Text>
          <Text style={style.textStyle}>visit in just a few clicks</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 40,
        }}
      >

        <Pressable onPress={() => navigation.replace("Login")}>
          <View style={style.btn}>
            <Text style={{ color: "white", fontSize: 20 }}>Get Started</Text>
          </View>
        </Pressable>

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
  title: { fontSize: 32, fontWeight: "bold" },
  textStyle: { fontSize: 16, color: COLORS.grey },
});
export default OnBoardScreen;
