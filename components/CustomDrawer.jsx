import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/core";

import { auth } from "../firebase/config"; // Ensure this path matches your project structure
import url from "./route/api"; // Ensure this path matches your project structure
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("Rushikesh Shrimanwar");
  const [userPhoneNumber, setUserPhoneNumber] = useState();
  const [userId, setUserId] = useState("");
  const [userRawId, setUserRawId] = useState("");

  // Loading States
  const [loading, setLoading] = useState(true);
  const [userTypeLoading, setUserTypeLoading] = useState(true);

  // Function to store userType in AsyncStorage
  const storeUserType = async (type) => {
    try {
      await AsyncStorage.setItem('@user_type', type);
    } catch (e) {
      console.error(e);
    }
  };

  // GETTING USER-ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // GETTING THE USER-INFO
  useEffect(() => {
    const getData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`);
        const data = await res.json();
        const tmpUserType = data.data[0]?.attributes?.user_type || "";
        const tmpUserName = data.data[0]?.attributes?.name || "";
        const tmpUserPhoneNumber = data.data[0]?.attributes?.number || "";
        const tmpUserRawId = data.data[0]?.id || "";

        setUserRawId(tmpUserRawId);
        setUserType(tmpUserType);
        await storeUserType(tmpUserType); // Store userType in AsyncStorage
        setUserName(tmpUserName);
        setUserPhoneNumber(tmpUserPhoneNumber);
        setUserTypeLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, [userId]);

  if (loading || userTypeLoading) {
    return null; // Consider showing a loading spinner here
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
      </View>

      <DrawerItemList {...props} />

      {/* Conditional rendering based on userType */}
      {userType === "staff" ? (
        <DrawerItem label="My Assign Leads" onPress={() => navigation.navigate('YourScreenNameForStaff')} />
      ) : userType === "broker" ? (
        <DrawerItem label="My Leads" onPress={() => navigation.navigate('YourScreenNameForBroker')} />
      ) : null}

      <View style={styles.signOutContainer}>
        <Button
          title="Sign Out"
          onPress={() => {
            auth.signOut().then(() => {
              navigation.replace("Login");
            }).catch(() => {
              alert("Something went wrong");
            });
          }}
          color="#ff0000"
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomColor: "#000",
  },
  greeting: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
  },
  signOutContainer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default CustomDrawer;
