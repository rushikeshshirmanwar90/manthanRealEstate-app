import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { styles } from "../styles/Login";
import Logo from "../assets/logo.png";
import FastImage from "react-native-fast-image";
import url from "../components/route/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        setLoading(true); // Start loading

        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        console.log(user.email);

        const name = await getLeadInfo(email);

        await AsyncStorage.setItem("userName", name);

        navigation.replace("Home");
      } else {
        alert("Please enter both email and password");
      }
    } catch (error) {
      alert("Error while Login: " + error.message);
      console.log("Error while Login: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getLeadInfo = async (email) => {
    try {
      const res = await fetch(
        `${url}/api/user-ids?filters[$and][0][mail][$eq]=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to check lead existence");
      }

      const data = await res.json();
      const name = data.data[0].attributes.name;
      return name;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  if (loading) {
    return (
      <View style={{ position: "absolute", top: 10, left: -70 }}>
        <Image
          style={{ width: 560 }}
          source={require("../assets/loading/loading.gif")} // Path to your GIF
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={Logo}
            />
            <Text style={styles.title}>
              <Text style={{ color: "#50719E" }}>
                Manthan Infracare (opc) Pvt.Ltd
              </Text>
            </Text>

            <Text style={styles.subtitle}>
              Login in to Manthan and get Dream House
            </Text>
          </View>

          <View style={styles.form}>
            {/* Taking input of hotel email Id */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={(e) => setEmail(e)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={email}
              />
            </View>

            {/* Taking input of Password */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(e) => setPassword(e)}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, styles.passwordInput]}
                  secureTextEntry={!showPassword}
                  value={password}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
              >
                <View style={styles.btn2}>
                  <Text style={{ color: "white", fontSize: 20 }}>Login in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View onPress={() => navigation.navigate("Register")}>
              <Text
                style={styles.formLink}
                onPress={() => navigation.navigate("Register")}
              >
                Don't have an account ?{" "}
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;
