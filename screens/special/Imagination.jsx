import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import COLORS from "../../components/consts/colors";
import Contact from "../../components/contact";

const { width, height } = Dimensions.get("window");

const Imagination = () => {
  const images = [
    "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733254488/img2_acc0f66456.webp",
    "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733254487/img_2cbd64b472.jpg",
    "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733254486/bed_room_1d4813daf7.jpg",
    "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733238485/Whats_App_Image_2024_12_03_at_20_36_35_3f8eca9b_0ad6d58b5b.jpg",
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "#203057", flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
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
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            )}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733259924/Imagination_Magic_Resort_Brochure_compressed_5309bfc366.pdf"
              );
            }}
          >
            <Text>Open</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Contact />
    </SafeAreaView>
  );
};

export default Imagination;

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
