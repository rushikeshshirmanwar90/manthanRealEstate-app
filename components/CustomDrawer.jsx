import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "../firebase/config";
import { useNavigation } from "@react-navigation/core";

const CustomDrawer = (props) => {

  const userName = "John Doe"; 
  const navigation = useNavigation();

  return (

    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
      </View>

      <DrawerItemList {...props} />

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