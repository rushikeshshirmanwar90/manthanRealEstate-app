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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("screen");

const Flats = (projectName) => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = projectName.route.params.name;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${url}/api/flats?populate=*&filters[$and][0][project][projectName][$eq]=${name}`
      );
      const data = await res.json();
      setFlats(data.data);
      setLoading(false);
    };
    getData();
  }, [loading]);

  // Skeleton Loader
  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 120, height: 100, borderRadius: 15 }} />
        <View style={{ marginLeft: 10 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4 }} />
          <View
            style={{ width: 80, height: 20, borderRadius: 4, marginTop: 6 }}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: 30, height: 20, borderRadius: 4 }} />
            <View
              style={{ width: 30, height: 20, borderRadius: 4, marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      <View style={{ flex: 1 }}>
        <View style={{ height: "40%" }}>
          <Swiper images={projectName.route.params.imgs} />
        </View>

        <View style={{ flex: 1, marginTop: 45 }}>
          {loading ? (
            // Display skeleton loaders while loading
            <FlatList
              data={[...Array(5).keys()]} // Show 5 skeletons
              renderItem={renderSkeleton}
              keyExtractor={(item) => item.toString()}
              contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
            />
          ) : (
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
              data={flats}
              renderItem={({ item }) => (
                <Card house={item} address={projectName.route.params.address} />
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Flats;