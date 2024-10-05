import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase/config";
import { styles } from "../styles/Login";
import url from "../components/route/api";

const Index = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>
              Login in to{" "}
              <Text style={{ color: "#075eec" }}>Manthan Infracare</Text>
            </Text>
            <Text style={styles.subtitle}>
              Login in to Manthan Get Your Dream house
            </Text>
            <View
              style={{ marginTop: 10 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={styles.formLink}
                onPress={() => navigation.navigate("Login")}
              >
                Already have a account ?{" "}
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            {/* Taking full name input */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Enter Full Name</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="ascii-capable"
                onChangeText={(e) => setName(e)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={name}
              />
            </View>

            {/* Taking phone number input */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Enter Phone Number</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                onChangeText={(e) => setNumber(Number(e))}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={number}
              />
            </View>

            {/* Taking Email address input */}
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

            {/* Taking password input */}
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

              {/* Taking input of Login type */}
              <View style={[styles.input, { marginTop: 20 }]}>
                <Text style={styles.inputLabel}>Select Login Type</Text>
                <View style={styles.inputControl}>
                  <Picker
                    selectedValue={loginType}
                    onValueChange={(itemValue, itemIndex) =>
                      setLoginType(itemValue)
                    }
                  >
                    <Picker.Item
                      label="I am looking for a house"
                      value="user"
                    />
                    <Picker.Item label="I am a broker" value="broker" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Register Button */}
            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  handleRegister();
                }}
              >
                <View style={styles.btn2}>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    Register Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;
