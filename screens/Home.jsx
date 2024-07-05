import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

import COLORS from "../components/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/core";

import url from "../components/route/api";

const { width } = Dimensions.get("screen");

const HomeScreen = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${url}/api/flats?populate=*`);

      const data = await res.json();

      setFlats(data.data);

      setLoading(false);
    };

    getData();
  }, [loading]);

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
              {/* 
              <View style={style.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={style.facilityText}>2</Text>
              </View> */}

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

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <View style={style.searchInputContainer}>
          <Icon name="search" color={COLORS.grey} size={25} />
          <TextInput placeholder="Search address, city, location" />
        </View>
      </View>

      <FlatList
        snapToInterval={width - 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
        data={flats}
        renderItem={({ item }) => <Card house={item} />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },

  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },

  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },

  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },

  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },

  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },

  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },

  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default HomeScreen;
