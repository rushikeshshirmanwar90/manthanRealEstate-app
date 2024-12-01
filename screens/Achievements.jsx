import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { style } from "../styles/project";

const Achievements = () => {
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
              },
              { textTransform: "capitalize" },
            ]}
          >
            Manthan Park Opening
          </Text>

          <Text style={{ color: "#A9A9A9", fontSize: 15, marginBottom: 10 }}>
            Description
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
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Achievements;


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
