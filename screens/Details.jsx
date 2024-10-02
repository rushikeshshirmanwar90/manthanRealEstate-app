import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";

import { auth } from "../firebase/config";
import COLORS from "../components/consts/colors";
import url from "../components/route/api";
import Icon from "react-native-vector-icons/FontAwesome";
import Skeleton from "../components/Skeleton";

// importing components
import Model from "../components/Model";
const { width } = Dimensions.get("screen");

const Details = ({ route }) => {
  const house = route.params;

  // USER INFORMATION STATES
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState();

  // Loading States
  const [loading, setLoading] = useState(true);
  const [userTypeLoading, setUserTypeLoading] = useState(true);
  const [mainHouse, setMainHouse] = useState(
    house.attributes.images.data[0].attributes.url
  );

  const [userId, setUserId] = useState("");
  const [userRawId, setUserRawId] = useState("");

  // GETTING USER-ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [userId, loading]);

  
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`
      );
      const data = await res.json();
      const tmpUserType = data.data[0].attributes.user_type;
      const tmpUserName = data.data[0].attributes.name;
      const tmpUserPhoneNumber = data.data[0].attributes.number;
      const tmpUserRawId = data.data[0].id;
      setUserRawId(tmpUserRawId);
      setUserType(tmpUserType);
      setUserName(tmpUserName);
      setUserPhoneNumber(tmpUserPhoneNumber);
      setUserTypeLoading(false);
    };

    getData();
  }, [userId, userTypeLoading, userType, userName]);

  // COMPONENT FOR THE SMALL IMAGES
  const InteriorCard = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          setMainHouse(item.item.attributes.formats.medium.url);
        }}
      >
        <Image
          source={{ uri: item.item.attributes.formats.medium.url }}
          style={style.interiorImage}
        />
      </Pressable>
    );
  };

  // FUNCTION TO ADD LEADS
  const addLead = async (
    userId,
    houseId,
    userName,
    flatName,
    phoneNumber,
    partner
  ) => {
    try {
      const res = await fetch(`${url}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            user_id: String(userId),
            flat_id: String(houseId),
            user_name: userName,
            flat_name: flatName,
            phone_number: String(phoneNumber),
            channel_partner: partner,
          },
        }),
      });

      if (!res.ok) {
        console.log("something went wrong");
      }
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  // FUNCTION TO WHATSAPP MESSAGE
  const handleWhatsAppPress = async () => {
    try {
      await addLead(
        userRawId,
        house.id,
        userName,
        house.attributes.name,
        userPhoneNumber,
        "SELF"
      );

      console.log("----------------------------------------");
      console.log(house);
      console.log("----------------------------------------");

      const url = `whatsapp://send?phone=9579896842&text=Hey There i am ${userName} and i am interested in your Flat 
      \n
        FlatId : ${house.id}
      `;
      Linking.openURL(url).catch(() => {
        Alert.alert("Make sure WhatsApp is installed on your device");
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // FUNCTION TO CALL
  const handleCallPress = async () => {
    try {
      await addLead(
        userId,
        house.id,
        userName,
        house.attributes.name,
        userPhoneNumber,
        "SELF"
      );
      Linking.openURL("tel:+919579896842");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // FUNCTION TO OPEN YOUTUBE
  const handleYTPress = () => {
    Linking.openURL(house.attributes.yt_link);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={{ uri: mainHouse }}
          ></ImageBackground>

          <TouchableOpacity onPress={handleYTPress}>
            <View style={style.virtualTag}>
              <Text style={{ color: "white" }}>Virtual tour</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={style.detailsContainer}>
          <FlatList
            contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.attributes.images.data}
            renderItem={(item) => <InteriorCard item={item} />}
          />

          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {house.attributes.name}
            </Text>
          </View>

          <Text style={{ fontSize: 18, color: COLORS.dark, marginTop: 5 }}>
            {house.attributes.description}
          </Text>

          <View style={style.bookedInfo}>
            <Text style={style.allText}>
              <Text style={{ fontWeight: 700 }}>Total : </Text>
              {house.attributes.total}
            </Text>
            <Text style={style.allText}>
              <Text style={{ fontWeight: 700 }}>Booked : </Text>
              {house.attributes.booked}
            </Text>
            <Text style={style.allText}>
              <Text style={{ fontWeight: 700 }}>Available : </Text>
              {house.attributes.total - house.attributes.booked}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={style.facility}>
              <Icon name="expand" size={18} />
              <Text style={style.facilityText}>
                {house.attributes.area} SQT
              </Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>{house.attributes.area}</Text>
            </View>
          </View>

          <Text style={{ marginTop: 20, color: COLORS.grey }}>
            {house.details}
          </Text>

          {userType !== "broker" ? (
            <View style={style.container}>
              <TouchableOpacity
                style={[style.wButton, { padding: 10 }]}
                onPress={handleWhatsAppPress}
              >
                <Icon name="whatsapp" size={20} color="#fff" />
                <Text style={style.wBtn}>WhatsApp Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={handleCallPress}>
                <Icon name="phone" size={20} color="#fff" />
                <Text style={style.buttonText}>Call Us Now</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Model
                userName={userName}
                flatId={house.id}
                userId={userRawId}
                flatName={house.attributes.name}
                addLead={addLead}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// STYLING
const style = StyleSheet.create({
  bookedInfo: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },

  allText: {
    fontSize: 15,
  },

  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 1,
    marginBottom: 10,
  },

  button: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 5,
  },

  wButton: {
    backgroundColor: "#0ec40e",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "#fff",
    marginLeft: 10,
    paddingHorizontal: 5,
  },

  wBtn: {
    color: "#fff",
    marginLeft: 10,
    paddingHorizontal: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Details;
