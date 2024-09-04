import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "./route/api";

const List = () => {
  const [userName, setUserName] = useState("");
  const [leads, setLeads] = useState([]);

  // Loading States
  const [userNameLoading, setUserNameLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(true);

  // randomNum
  const [randomNum, setRandomNum] = useState(0);

  // GETTING userName
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user_name");
        console.log(value);
        if (value !== null) {
          setUserName(value);
          setUserNameLoading(false);
          return value;
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [userNameLoading, userName, randomNum]);

  // GETTING Leads Data

  useEffect(() => {
    const getData = async () => {
      console.log(userName);

      // ${userName}
      const res = await fetch(
        `${url}/api/leads?filters[$and][0][channel_partner][$eq]=broker`
      );

      const data = await res.json();
      setLeads(data.data);
      setLeadsLoading(false);
      console.log(data.data);
    };
    getData();
  }, [leadsLoading, userName]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.searchContent}>
        {leads.map((item, index) => {
          return (
            <View key={index} style={styles.cardWrapper}>
              <TouchableOpacity style={styles.card}>
                <View style={[styles.cardAvatar, styles.cardImg]}>
                  <Text style={styles.cardAvatarText}>
                    {item.attributes.flat_id}
                  </Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>
                    {item.attributes.user_name}
                  </Text>

                  <Text style={styles.cardPhone}>
                    Assign To : {item.attributes.assign}
                  </Text>

                  <Text style={styles.cardPhone}>
                    Phone Number : {item.attributes.phone_number}
                  </Text>

                  {item.attributes.booked === true ? (
                    <Text
                      style={{
                        color: "#f5162c",
                        fontWeight: 700,
                        marginTop: 3,
                        fontSize: 16,
                      }}
                    >
                      Closed
                    </Text>
                  ) : (
                    ""
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  search: {
    position: "relative",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  searchWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },

  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },

  searchContent: {
    paddingLeft: 24,
  },

  searchEmpty: {
    textAlign: "center",
    paddingTop: 16,
    fontWeight: "500",
    fontSize: 15,
    color: "#9ca1ac",
  },

  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: "#d6d6d6",
  },

  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },

  cardAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9ca1ac",
  },

  cardAvatarText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
  },

  cardBody: {
    marginRight: "auto",
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    color: "#616d79",
    marginTop: 3,
  },

  cardAction: {
    paddingRight: 16,
  },
});
