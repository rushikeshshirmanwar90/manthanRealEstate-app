import {
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../components/consts/colors";
import { style } from "../styles/project";
import url from "../components/route/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${url}/api/events?populate=*`);
        const data = await response.json();
        setEvents(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView
      style={{
        marginLeft: 20,
        marginVertical: 10,
      }}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {loading ? (
        <Text style={{ color: "#fff", textAlign: "center" }}>Loading...</Text>
      ) : events.length === 0 ? (
        <Text style={{ color: "#fff", textAlign: "center" }}>
          No events available.
        </Text>
      ) : (
        events.map((event, index) => (
          <Pressable key={index}>
            <View style={[style.card, { marginBottom: 20 }]}>
              <Image
                source={{
                  uri:
                    event.attributes.images.data[0]?.attributes.formats.medium
                      .url || event.attributes.images.data[0]?.attributes.url,
                }}
                style={style.cardImage}
                onError={() => console.log("Error loading image")}
                resizeMode="cover"
              />

              <Text
                style={[
                  {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#f0c35f",
                    marginTop: 5,
                  },
                  { textTransform: "capitalize" },
                ]}
              >
                {event.attributes.name}
              </Text>

              <Text
                style={{ color: "#A9A9A9", fontSize: 15, marginBottom: 10 }}
              >
                {event.attributes.description}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.virtualTag}
                  onPress={() => {
                    if (event.attributes.youtube) {
                      Linking.openURL(event.attributes.youtube);
                    } else {
                      console.log("No YouTube link available.");
                    }
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.golden,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    View Video
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        ))
      )}
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  virtualTag: {
    height: 40,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "#0a2159",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0c35f",
  },
});
