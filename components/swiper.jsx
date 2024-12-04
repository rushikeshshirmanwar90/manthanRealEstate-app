import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");

const App = ({ images }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.swiperContainer}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        paginationStyle={styles.paginationStyle}
        paginationStyleItem={styles.paginationStyleItem}
        paginationActiveColor="#D6AA65"
        showPagination
        data={images}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image
              source={{ uri: item.attributes.formats.medium.url }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  swiperContainer: {
    marginVertical: 20,
    height: height * 0.4,
  },

  child: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: width * 0.9,
    height: "100%",
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: "#f0c35f",
  },

  paginationStyle: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },

  paginationStyleItem: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: "#333",
  },
});

export default App;
