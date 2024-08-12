import React from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

// importing images
import img1 from "../assets/Manthan Pride extrior images/01_1 - Photo.jpg";
import img2 from "../assets/Manthan Pride extrior images/01_2 - Photo.jpg";
import img3 from "../assets/Manthan Pride extrior images/01_3 - Photo.jpg";
import img4 from "../assets/Manthan Pride extrior images/01_4 - Photo.jpg";
import img5 from "../assets/Manthan Pride extrior images/01_5 - Photo.jpg";
import img6 from "../assets/Manthan Pride extrior images/01_6 - Photo.jpg";
import img7 from "../assets/Manthan Pride extrior images/01_7 - Photo.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const { width, height } = Dimensions.get("window");

const App = () => (
  <View style={{ flex: 1 }}>
    <View style={styles.swiperContainer}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        paginationStyle={styles.paginationStyle} // Custom Pagination Style
        paginationStyleItem={styles.paginationStyleItem}
        paginationActiveColor="#D6AA65"
        showPagination
        data={images}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image source={item} style={styles.image} />
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
    width: width * 0.9, // Adjust width as needed
    height: "100%", // Full height within the swiper container
    borderRadius: 10,
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
    backgroundColor: "#333", // Customize dot color
  },
});

export default App;
