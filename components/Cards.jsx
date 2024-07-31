import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../components/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

// IMPORTING STYLES
import { style } from "../styles/project";

const Card = ({ house }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={() => navigation.navigate("Details", house)}
    >
      <View style={[style.card, { marginBottom: 20 }]}>
        <Image
          source={{
            uri: `${house.attributes.images.data[0].attributes.url}`,
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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {house.attributes.name}
            </Text>
          </View>
          <Text style={{ color: COLORS.grey, fontSize: 14, marginTop: 5 }}>
            {house.attributes.address}
          </Text>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>{house.attributes.BHK}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>{house.attributes.area}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
