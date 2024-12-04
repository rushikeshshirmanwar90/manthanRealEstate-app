import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "../../styles/project";

const Component = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={() => navigation.navigate("Imagination")}
    >
      <View style={[style.card, { marginBottom: 20 }]}>
        <Image
          source={{
            uri: `https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733238485/Whats_App_Image_2024_12_03_at_20_36_35_3f8eca9b_0ad6d58b5b.jpg`,
          }}
          style={style.cardImage}
        />
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                { fontSize: 18, fontWeight: "bold", color: "#f0c35f" },
                { textTransform: "capitalize" },
              ]}
            >
              Imagination Magic Resort
            </Text>
          </View>
          <Text style={{ color: "#A9A9A9", fontSize: 15, marginTop: 5 }}>
            Mumbai Thane, Taluka : Shahapur, Mauza : Jambulwad - Ranvir
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Component;
