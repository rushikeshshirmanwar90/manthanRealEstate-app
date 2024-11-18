import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../components/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const Card = ({ house, address }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={() => navigation.navigate("Details", house)}
    >
      <View style={[style.card, { marginBottom: 20 }]}>
        <Image
          source={{ uri: `${house.attributes.images.data[0].attributes.url}` }}
          style={style.image}
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
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#f0c35f",
                flexWrap: "wrap", // Allow text to wrap
                maxWidth: "80%", // Limit width to avoid overflow
              }}
              numberOfLines={1} // Limit to a single line
              ellipsizeMode="tail" // Show "..." if text overflows
            >
              {house.attributes.name}
            </Text>
          </View>

          <Text
            style={{
              color: COLORS.grey,
              fontSize: 14,
              marginTop: 5,
              width: "auto",
              flexWrap: "wrap", // Allow text to wrap
              maxWidth: "80%", // Limit width to avoid overflow
            }}
            numberOfLines={2} // Limit address to 2 lines
            ellipsizeMode="tail" // Show "..." if address text overflows
          >
            {address}
          </Text>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={style.facility}>
              <Icon name="hotel" color={"#f0c35f"} size={18} />
              <Text style={style.facilityText}>{house.attributes.BHK}</Text>
            </View>

            <View style={style.facility}>
              <Icon name="aspect-ratio" color={"#f0c35f"} size={18} />
              <Text style={style.facilityText}>{house.attributes.area}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const style = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#0a2159",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    margin: 10,
    gap: 12,
    borderBlockColor: "#f0c35f",
    borderWidth: 0.8,
    borderColor: "#f0c35f",
    elevation: 4,
  },

  image: {
    width: 120,
    height: 100,
    borderRadius: 15,
    marginTop: 10,
  },

  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  location: {
    color: "gray",
    marginTop: 5,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  bedroomText: {
    marginLeft: 5,
    fontSize: 18,
  },

  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: "#fff" },
});
