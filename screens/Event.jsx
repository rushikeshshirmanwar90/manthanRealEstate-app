import {
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import COLORS from "../components/consts/colors";
import { style } from "../styles/project";
import url from "../components/route/api";
import img from "../assets/loading/img1.jpg";
import { Ionicons } from "@expo/vector-icons";

const Events = () => {
  return (
    <SafeAreaView
      style={{
        marginLeft: 20,
        marginVertical: 10,
      }}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Pressable>
        <View style={[style.card, { marginBottom: 20 }]}>
          <Image
            source={img}
            style={style.cardImage}
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
                marginBottom: 5,
              },
              { textTransform: "capitalize" },
            ]}
          >
            Manthan Park Opening
          </Text>

          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.virtualTag}>

              <Text
                style={{
                  color: COLORS.golden,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                View More
              </Text>

            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.virtualTag,
                {
                  marginTop: 10,
                },
              ]}
            >

              <Text
                style={{
                  color: COLORS.golden,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                View Video
              </Text>

            </TouchableOpacity>
          </View>

        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 300,
  },

  virtualTag: {
    height: 40,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "#0a2159",
    color: COLORS.golden,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0c35f",
  },
});