import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
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
    "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733310722/Summertime_goa_indiasbestvilla_lead_232d9dc0a9.webp",
    "https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733238485/Whats_App_Image_2024_12_03_at_20_36_35_3f8eca9b_0ad6d58b5b.jpg",
  ];

  const brochures = [
    {
      id: 1,
      text: "Get Brochure",
      link: "https://drive.google.com/file/d/118Sewnm0wTaRmdWlq_vOhEM2bLNKNNC_/view?usp=drive_link",
    },
    {
      id: 2,
      text: "Get pamphlet",
      link: "https://drive.google.com/file/d/1DcJQYOHlxcPDR5rSxeMfLOmOLuktxwxa/view?usp=drive_link",
    },
  ];

  const handleBrochurePress = (link) => {
    Linking.openURL(link);
  };

  const handleYTPress = () => {
    Linking.openURL(`https://youtu.be/GFyyqAif8wc?feature=shared`);
  };

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
                <Image source={{ uri: item }} style={styles.BigImage} />
              </View>
            )}
          />
          <TouchableOpacity onPress={handleYTPress}>
            <View style={styles.virtualTag}>
              <Text style={{ color: COLORS.golden, fontSize: 15 }}>
                View Video
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.brochureContainer}>
          {brochures.map((brochure) => (
            <Pressable
              key={brochure.id}
              style={({ pressed }) => [
                styles.brochureCard,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={() => handleBrochurePress(brochure.link)}
            >
              <Image
                source={{
                  uri: `https://res.cloudinary.com/dlcq8i2sc/image/upload/v1733238485/Whats_App_Image_2024_12_03_at_20_36_35_3f8eca9b_0ad6d58b5b.jpg`,
                }}
                style={styles.brochureImage}
              />
              <Text style={styles.brochureText}>{brochure.text}</Text>
            </Pressable>
          ))}
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
  BigImage: {
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
    alignItems: "center",
  },
  paginationStyleItem: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: "#333",
  },
  brochureContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  brochureCard: {
    backgroundColor: "#0a2159",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: width * 0.4,
    borderWidth: 1,
    borderColor: "#f0c35f",
  },
  brochureImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  brochureText: {
    marginTop: 10,
    color: "#f0c35f",
    fontSize: 14,
    textAlign: "center",
  },

  virtualTag: {
    height: 40,
    width: 120,
    backgroundColor: "#0a2159",
    position: "absolute",
    bottom: -20,
    left: "35%",
    color: COLORS.golden,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0c35f",
  },
});
