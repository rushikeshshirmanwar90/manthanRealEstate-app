import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Linking,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../components/consts/colors";

const { width } = Dimensions.get("screen");

const Details = ({ route }) => {
  const house = route.params;

  const [mainHouse, setMainHouse] = useState(
    house.attributes.images.data[0].attributes.url
  );

  const handlePress = () => {
    Linking.openURL(house.attributes.yt_link);
  };

  const InteriorCard = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          setMainHouse(item.item.attributes.formats.medium.url);
        }}
      >
        <Image
          source={{ uri: item.item.attributes.formats.medium.url }}
          style={style.interiorImage}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={{ uri: mainHouse }}
          ></ImageBackground>

          <TouchableOpacity onPress={handlePress}>
            <View style={style.virtualTag}>
              <Text style={{ color: "white" }}>Virtual tour</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={style.detailsContainer}>
          {/* Interior list */}
          <FlatList
            contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.attributes.images.data}
            renderItem={(item) => <InteriorCard item={item} />}
          />

          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {house.attributes.name}
            </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#444" }}>
            {house.attributes.short_description}
          </Text>

          <Text style={{ fontSize: 16, color: COLORS.grey }}>
            {house.attributes.address}
          </Text>

          <Text style={{ fontSize: 16, color: COLORS.grey }}>
            {house.attributes.city} {""} {house.attributes.state}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
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
              <Text style={style.facilityText}>100m area</Text>
            </View>
          </View>

          <Text style={{ marginTop: 20, color: COLORS.grey }}>
            {house.details}
          </Text>

          {/* footer container */}
          <View style={[style.footer]}>
            <View style={[style.bookNowBtn, { flex: 1 }]}>
              <Text style={{ color: COLORS.white, fontSize: 18 }}>
                Book Now
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default Details;
