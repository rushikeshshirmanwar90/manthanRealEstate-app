import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/core";

import { auth } from "../firebase/config";
import url from "./route/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  const [userType, setUserType] = useState("");
  const [storedName, setStoredName] = useState("UserName"); // Changed to storedName
  const [userId, setUserId] = useState("");

  // Loading State
  const [loading, setLoading] = useState(true);

  // Function to store data in AsyncStorage
  const storeUserData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
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
    const getUserData = async () => {
      if (!userId) return;
      try {
        console.log(userId);
        console.log(userId);

        const res = await fetch(
          `${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`
        );
        const data = await res.json();
        const tmpUserType = data.data[0]?.attributes?.user_type || "";
        const name = data.data[0]?.attributes.name || "";
        setUserType(tmpUserType);

        console.log(name);
        setStoredName(name);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [userId]);

  if (loading) {
    return null; // Consider showing a loading spinner here
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.greeting}>Hello, {storedName}</Text>
      </View>

      {/* Conditionally render DrawerItemList based on userType */}
      {userType !== "staff" && <DrawerItemList {...props} />}

      {/* Conditional rendering based on userType */}
      {userType === "staff" && (
        <DrawerItem
          label="My Assign Leads"
          onPress={() => navigation.navigate("Assign Leads")}
        />
      )}

      {/* Uncomment and modify as needed */}
      {/* {userType === "broker" && (
        <DrawerItem
          label="My Leads"
          onPress={() => navigation.navigate("My leads")}
        />
      )} */}

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
          color="#111"
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
