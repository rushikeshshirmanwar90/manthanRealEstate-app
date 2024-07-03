import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import { styles } from "../styles/Login";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user.email);
          navigation.navigate("Home");
        })
        .catch((err) => {
          alert(err.message);
          console.log(err.message);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            {/* <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={Logo}
            /> */}
            <Text style={styles.title}>
              Login in to <Text style={{ color: "#075eec" }}>Manthan</Text>
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

            {/* Taking input of Hotel Password */}
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
