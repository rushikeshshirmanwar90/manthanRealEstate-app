import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const Contact = ({ message }) => {
  const handleWhatsAppPress = async () => {
    try {
      const url = `whatsapp://send?phone=8285354444&text=${message}`;
      Linking.openURL(url).catch(() => {
        Alert.alert("Make sure WhatsApp is installed on your device");
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleCallPress = async () => {
    try {
      Linking.openURL("tel:+918285354444");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.wButton, { padding: 10 }]}
          onPress={handleWhatsAppPress}
        >
          <Icon name="whatsapp" size={20} color="#fff" />
          <Text style={styles.wBtn}>WhatsApp Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCallPress}>
          <Icon name="phone" size={20} color="#0774C4" />
          <Text style={styles.buttonText}>Call Us Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#0774C4",
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  buttonText: {
    marginLeft: 8,
    color: "#0774C4",
    fontWeight: "bold",
    width: 100,
  },

  wButton: {
    backgroundColor: "#25d366",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    width: 165,
  },

  wBtn: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "bold",
  },
});
