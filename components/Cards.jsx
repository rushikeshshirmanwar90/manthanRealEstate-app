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
      <View style={style.card}>
        <Image
          source={{ uri: `${house.attributes.images.data[0].attributes.url}` }}
          style={style.image}
        />
        <View style={style.textContainer}>
          <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
            {house.attributes.name}
          </Text>

          <Text style={style.address} numberOfLines={2} ellipsizeMode="tail">
            {address}
          </Text>

          <View style={style.facilityContainer}>
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
    marginHorizontal: 10,
    marginVertical: 15,
    borderWidth: 0.8,
    borderColor: "#f0c35f",
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f0c35f",
    flexShrink: 1,
  },
  address: {
    color: COLORS.grey,
    fontSize: 14,
    marginTop: 5,
    flexShrink: 1,
  },
  facilityContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  facility: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  facilityText: {
    marginLeft: 5,
    color: "#fff",
  },
});
