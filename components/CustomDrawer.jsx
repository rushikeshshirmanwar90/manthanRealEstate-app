import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Share,
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
    return null;
  }

  const socialLinks = [
    {
      platform: "Instagram",
      url: "https://www.instagram.com/manthaninfracare/profilecard/?igsh=MXZlZG5hNXJybWp6Nw==FFFFFF",
      icon: "instagram",
      color: "#E1306C", // Instagram's official color
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61563087785902&mibextid=ZbWKwLF",
      icon: "facebook",
      color: "#1877F2", // Facebook's official color
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@Manthan_Infracare",
      icon: "youtube-play",
      color: "#FF0000", // YouTube's official color
    },
    {
      platform: "WhatsApp",
      url: "https://wa.me/+918285374444",
      icon: "whatsapp",
      color: "#25D366", // WhatsApp's official color
    },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "https://play.google.com/store/apps/details?id=com.rushi_shrimanwar.manthanrealestate",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVisitWebsite = () => {
    Linking.openURL("https://manthaninfracare.com/");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.greeting}>Hii 👋, {storedName} </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          {userType !== "staff" && <DrawerItemList {...props} />}
          {userType === "staff" && (
            <DrawerItem
              label="My Assign Leads"
              onPress={() => navigation.navigate("Assign Leads")}
            />
          )}

          <View style={styles.separator} />

          <DrawerItem
            label="Our Achievements"
            onPress={() => navigation.navigate("Achievements")}
            labelStyle={styles.goldenLabel}
            icon={({ focused, size }) => (
              <FontAwesome name="trophy" size={18} color="#f0c35f" />
            )}
          />
          <DrawerItem
            label="Events"
            onPress={() => navigation.navigate("Events")}
            labelStyle={styles.goldenLabel}
            icon={({ focused, size }) => (
              <FontAwesome name="calendar" size={18} color="#f0c35f" />
            )}
          />
          <DrawerItem
            label="Share"
            onPress={handleShare}
            labelStyle={styles.goldenLabel}
            icon={({ focused, size }) => (
              <FontAwesome name="share-alt" size={18} color="#f0c35f" />
            )}
          />
          <DrawerItem
            label="Visit Website"
            onPress={handleVisitWebsite}
            labelStyle={styles.goldenLabel}
            icon={({ focused, size }) => (
              <FontAwesome name="globe" size={18} color="#f0c35f" />
            )}
          />
        </View>

        <View style={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(link.url)}
              style={styles.socialIcon}
            >
              <FontAwesome name={link.icon} size={24} color={link.color} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
  separator: {
    height: 1,
    backgroundColor: "#f0c35f",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  goldenLabel: {
    color: "#f0c35f",
    fontWeight: "500",
    marginLeft: -20, // Added to adjust label position with icons
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
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
