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
  const [storedName, setStoredName] = useState("UserName");
  const [userId, setUserId] = useState("");

  // Loading State
  const [loading, setLoading] = useState(true);

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
        const res = await fetch(
          `${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`
        );
        const data = await res.json();
        const tmpUserType = data.data[0]?.attributes?.user_type || "";
        const name = data.data[0]?.attributes.name || "";
        setUserType(tmpUserType);
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

      {userType !== "staff" && <DrawerItemList {...props} />}

      {userType === "staff" && (
        <DrawerItem
          label="My Assign Leads"
          onPress={() => navigation.navigate("Assign Leads")}
        />
      )}

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
          color="#f0c35f" // Updated button color
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#162c63", // Updated background color
    borderBottomColor: "#f0c35f", // Updated border color
    borderBottomWidth: 1,
  },
  greeting: {
    color: "#f0c35f", // Updated text color
    fontSize: 18,
    fontWeight: "bold",
  },
  signOutContainer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0c35f", // Updated border color
    backgroundColor: "#162c63", // Updated background color
  },
});

export default CustomDrawer;
