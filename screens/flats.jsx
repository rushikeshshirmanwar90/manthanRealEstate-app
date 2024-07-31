import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../components/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import url from "../components/route/api";

import { style } from "../styles/project";
import Card from "../components/Cards";

const { width } = Dimensions.get("screen");

const Flats = (projectName) => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const navigation = useNavigation();

  const name = projectName.route.params;

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

  const filters = ["1BHK", "2BHK", "3BHK"];

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      <View style={style.filterBtnBox}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              style.filterBtn,
              activeFilter === filter && style.activeFilterBtn,
            ]}
          >
            <Text
              style={[
                style.filterBtnText,
                activeFilter === filter && style.activeFilterBtnText,
              ]}
            >

              {filter}
            </Text>
          </Pressable>
          
        ))}
      </View>

      <FlatList
        snapToInterval={width - 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
        data={flats}
        renderItem={({ item }) => <Card house={item} />}
      />
    </SafeAreaView>
  );
};

export default Flats;