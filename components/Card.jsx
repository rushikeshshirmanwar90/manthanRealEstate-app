import React from "react";
import { View, Text, Pressable, Image } from "react-native";

// NAVIGATION
import { useNavigation } from "@react-navigation/core";

// ICONS
import Icon from "react-native-vector-icons/MaterialIcons";

const Card = ({ house }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={() => navigation.navigate("Details", house)}
    >
      <View style={[style.card, { marginTop: 20 }]}>
        <Image source={house.image} style={style.cardImage} />

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {house.title}
            </Text>
          </View>

          <Text style={{ color: COLORS.grey, fontSize: 14, marginTop: 5 }}>
            {house.location}
          </Text>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>

            <View style={style.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>

            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>100m</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
