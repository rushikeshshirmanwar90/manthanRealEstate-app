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

  // GETTING THE USER-INFO
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
      const leadExists = await checkLeadExists(userRawId, house.id);
      if (!leadExists) {
        console.log(userRawId);
        console.log(userName);

        await addLead(
          userRawId,
          house.id,
          userName,
          house.attributes.name,
          userPhoneNumber,
          "SELF"
        );
      }
      const url = `whatsapp://send?phone=8285374444&text=Hey There I am ${userName} interested in your Flat 
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
      const leadExists = await checkLeadExists(userRawId, house.id);
      if (!leadExists) {
        await addLead(
          userRawId,
          house.id,
          userName,
          house.attributes.name,
          userPhoneNumber,
          "SELF"
        );
      }
      Linking.openURL("tel:+918285374444");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // FUNCTION TO OPEN YOUTUBE
  const handleYTPress = () => {
    Linking.openURL(house.attributes.yt_link);
  };

  // FUNCTION TO CHECK LEAD IS PRESENT OR NOT
  const checkLeadExists = async (userId, houseId) => {
    try {
      const res = await fetch(
        `${url}/api/leads?user_id=${userId}&flat_id=${houseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to check lead existence");
      }

      const data = await res.json();
      // Assuming the response returns an array of leads
      return data.length > 0; // Returns true if a lead exists
    } catch (error) {
      console.log(error.message);
      return false; // Consider lead does not exist in case of an error
    }
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

          {/* Changed 'aView' to 'View' */}
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
            <Model />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  virtualTag: {
    height: 40,
    width: 120,
    backgroundColor: COLORS.dark,
    position: "absolute",
    bottom: 0,
    left: 20,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  facility: {
    flexDirection: "row",
    marginRight: 15,
  },
  facilityText: {
    marginLeft: 5,
    color: COLORS.grey,
  },
  bookedInfo: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.dark,
    borderRadius: 5,
    backgroundColor: COLORS.light,
  },
  allText: {
    fontSize: 14,
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },

  buttonText: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },

  wButton: {
    backgroundColor: "#25d366",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },

  wBtn: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Details;
