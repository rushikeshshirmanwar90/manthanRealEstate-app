import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import COLORS from "../components/consts/colors";
import { style } from "../styles/project";
import url from "../components/route/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Access navigation

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

  const renderEventCard = ({ item: event }) => (
    <TouchableOpacity
      style={[style.card, { marginBottom: 20 }]}
      onPress={() =>
        navigation.navigate("Event Details", {
          event: event.attributes, // Pass the event data
        })
      }
    >
      <Image
        source={{
          uri:
            event.attributes.images.data[0]?.attributes.formats.medium.url ||
            event.attributes.images.data[0]?.attributes.url,
        }}
        style={style.cardImage}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#f0c35f",
          marginTop: 3,
        }}
      >
        {event.attributes.name}
      </Text>
      <Text style={{ color: "#A9A9A9", fontSize: 15, marginBottom: 10 }}>
        {event.attributes.description}
      </Text>

      <TouchableOpacity
        style={style.button}
        onPress={() =>
          navigation.navigate("Event Details", { event: event.attributes })
        }
      >
        <Text style={style.buttonText}>View More</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#162c63" }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      {loading ? (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          Loading...
        </Text>
      ) : events.length === 0 ? (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          No events available.
        </Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventCard}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Events;
