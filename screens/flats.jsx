import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import COLORS from "../components/consts/colors";
import url from "../components/route/api";
import Card from "../components/Cards";
import Swiper from "../components/swiper";

const { width } = Dimensions.get("screen");

const Flats = (projectName) => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const name = projectName.route.params;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${url}/api/flats?populate=*&filters[$and][0][project][projectName][$eq]=${name}`
      );
      const data = await res.json();
      setFlats(data.data);
      console.log(
        data.data[0].attributes.images.data[0].attributes.formats.medium.url
      );
      setImages(data.data[0].attributes.images.data);
      setLoading(false);
    };
    getData();
  }, [loading]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      <View style={{ flex: 1 }}>
        <View style={{ height: "40%" }}>
          <Swiper images={images} />
        </View>
        <View style={{ flex: 1, marginTop: 45 }}>
          <FlatList
            snapToInterval={width - 20}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
            data={flats}
            renderItem={({ item }) => <Card house={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Flats;
