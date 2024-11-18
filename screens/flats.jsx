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
import Skeleton from "../components/Skeleton";

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

  return (
    <SafeAreaView style={{ backgroundColor: "#203057", flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      <View style={{ flex: 1 }}>
        {!loading ? (
          <View style={{ height: "40%" }}>
            <Swiper images={projectName.route.params.imgs} />
          </View>
        ) : (
          <View style={{ paddingLeft: 20 }}>
            <Skeleton width={375} height={350} />
          </View>
        )}

        {!loading ? (
          <View style={{ flex: 1, marginTop: 45 }}>
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
              data={flats}
              renderItem={({ item }) => (
                <Card house={item} address={projectName.route.params.address} />
              )}
            />
          </View>
        ) : (
          <View style={{ paddingLeft: 20, marginTop: 40 }}>
            <Skeleton width={370} height={100} />
            <Skeleton width={370} height={100} />
            <Skeleton width={370} height={100} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Flats;
