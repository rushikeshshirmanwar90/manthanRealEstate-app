import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import COLORS from "../components/consts/colors";
import SwiperFlatList from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");
const EventDetails = ({ route }) => {
  const { event } = route.params;

  event.images.data.map((item) => {
    console.log("-----------");
    console.log(item.attributes.url);
  });

  //   console.log(event.images.data);

  const handleYouTubePress = () => {
    if (event.youtube) {
      Linking.openURL(event.youtube);
    } else {
      Alert.alert("No YouTube Video available");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#162c63" }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* <Image
          source={{
            uri:
              event.images.data[0]?.attributes.formats.medium.url ||
              event.images.data[0]?.attributes.url,
          }}
          style={styles.image}
        /> */}

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
            data={event.images.data}
            renderItem={({ item }) => (
              <View style={styles.child}>
                <Image
                  source={{
                    uri: item.attributes.url,
                  }}
                  style={styles.BigImage}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>

        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <TouchableOpacity style={styles.button} onPress={handleYouTubePress}>
          <Text style={styles.buttonText}>Watch Video</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  swiperContainer: {
    marginVertical: 20,
    height: height * 0.4,
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

  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f0c35f",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#A9A9A9",
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a2159",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0c35f",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.golden,
  },
});
