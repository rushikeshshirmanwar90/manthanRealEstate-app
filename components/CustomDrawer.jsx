import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"; // Ensure DrawerItem is imported
import { useNavigation } from "@react-navigation/core";

import { auth } from "../firebase/config"; // Ensure this path matches your project structure
import url from "./route/api"; // Ensure this path matches your project structure
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("Rushikesh Shrimanwar");
  const [userId, setUserId] = useState("");

  // Loading States
  const [loading, setLoading] = useState(true);

  // Function to store userType in AsyncStorage
  const storeUserType = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.error(e);
    }
  };

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

  useEffect(() => {
    const getData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(
          `${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`
        );
        const data = await res.json();
        const tmpUserType = data.data[0]?.attributes?.user_type || "";
        const userName = data.data[0]?.attributes.name || "";
        setUserType(tmpUserType);
        await storeUserType("@user_type", tmpUserType);
        await storeUserType("@user_name", userName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, [userId]);

  if (loading) {
    return null; // Consider showing a loading spinner here
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
      </View>

      {/* Conditionally render DrawerItemList based on userType */}
      {userType !== "staff" && <DrawerItemList {...props} />}

      {/* Conditional rendering based on userType */}
      
      {userType === "staff" ? (
        <DrawerItem
          label="My Assign Leads"
          onPress={() => navigation.navigate("Assign Leads")}
        />
      ) : null}

      {/* {userType === "broker" ? (
        <DrawerItem
          label="My Leads"
          onPress={() => navigation.navigate("My leads")}
        />
      ) : null} */}

      <View style={styles.signOutContainer}>
        <Button
          title="Sign Out"
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                navigation.replace("Login");
              })
              .catch(() => {
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
