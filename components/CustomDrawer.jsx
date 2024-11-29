import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";

import { auth } from "../firebase/config";
import url from "./route/api";

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

  // Social Media Links
  const socialLinks = [
    { platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { platform: "YouTube", url: "https://youtube.com", icon: "youtube-play" },
    {
      platform: "WhatsApp",
      url: "https://wa.me/<YourPhoneNumber>",
      icon: "whatsapp",
    },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Text style={styles.greeting}>Hello, {storedName}</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          {/* Drawer Items */}
          {userType !== "staff" && <DrawerItemList {...props} />}
          {userType === "staff" && (
            <DrawerItem
              label="My Assign Leads"
              onPress={() => navigation.navigate("Assign Leads")}
            />
          )}
        </View>

        {/* Social Media Links */}
        <View style={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(link.url)}
              style={styles.socialIcon}
            >
              <FontAwesome name={link.icon} size={24} color="#f0c35f" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sign Out Button */}
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
          color="#f0c35f"
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#162c63",
    borderBottomColor: "#f0c35f",
    borderBottomWidth: 1,
  },
  greeting: {
    color: "#f0c35f",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0c35f",
    borderBottomWidth: 1,
    borderBottomColor: "#f0c35f",
    paddingTop: 10,
  },
  socialIcon: {
    padding: 10,
  },
  signOutContainer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0c35f",
    backgroundColor: "#162c63",
  },
});

export default CustomDrawer;
