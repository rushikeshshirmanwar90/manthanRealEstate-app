import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

// Drawer Screen Components
import CompletedProject from "./screens/project/CompletedProject";
import OnGoingProject from "./screens/project/OnGoingProject";
import UpComingProject from "./screens/project/UpComingProject";

// All Screen Components
import Login from "./screens/Login";
import Register from "./screens/Register";
import OnBoardScreen from "./screens/onBording";
import Details from "./screens/Details";
import FavHome from "./screens/FavHome";
import CustomDrawer from "./components/CustomDrawer";
import Flats from "./screens/flats";
import BrokerLeads from "./screens/BrokerLeads";
import StaffLeads from "./screens/StaffLeads";

// importing auth
import { auth } from "./firebase/config";
import url from "./components/route/api";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  // USER INFORMATION STATES
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("Rushikesh Shrimanwar");
  const [userPhoneNumber, setUserPhoneNumber] = useState();
  const [userId, setUserId] = useState("");
  const [userRawId, setUserRawId] = useState("");

  // Loading States
  const [loading, setLoading] = useState(true);
  const [userTypeLoading, setUserTypeLoading] = useState(true);

  // GETTING USER-ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setLoading(false);
        console.log(user.uid);
      } else {
        setLoading(false);
        console.log("No User Id");
      }
    });

    return unsubscribe;
  }, []);

  // GETTING THE USER-INFO
  useEffect(() => {
    const getData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(
          `${url}/api/user-ids?filters[$and][0][userId][$eq]=${userId}`
        );
        const data = await res.json();
        const tmpUserType = data.data[0]?.attributes?.user_type || "";
        const tmpUserName = data.data[0]?.attributes?.name || "";
        const tmpUserPhoneNumber = data.data[0]?.attributes?.number || "";
        const tmpUserRawId = data.data[0]?.id || "";
        setUserRawId(tmpUserRawId);
        setUserType(tmpUserType);
        setUserName(tmpUserName);
        setUserPhoneNumber(tmpUserPhoneNumber);
        setUserTypeLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserTypeLoading(false);
      }
    };

    getData();
  }, [userId]);

  if (loading || userTypeLoading) {
    return null;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} name={userName} />}
      screenOptions={{
        drawerStyle: {},
        drawerLabelStyle: {
          color: "#000",
        },
        drawerActiveBackgroundColor: "#cccccc",
        drawerInactiveTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#f2f2f2",
        },
        headerTintColor: "#222",
      }}
    >
      <Drawer.Screen name="OnGoing Project" component={OnGoingProject} />
      <Drawer.Screen name="Completed Project" component={CompletedProject} />
      <Drawer.Screen name="UpComing Project" component={UpComingProject} />
      {userType === "broker" && (
        <Drawer.Screen name="My Leads" component={BrokerLeads} />
      )}
    </Drawer.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Manthan");

  useEffect(() => {
    async function prepare() {
      try {
        console.log("Starting app preparation...");

        // Prevent auto-hiding of splash screen
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Entypo.font,
        });

        // Check if user is logged in
        await new Promise((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              setInitialRoute("Home");
            }
            resolve();
            unsubscribe();
          });
        });

        // Artificial delay to show splash screen
        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log("App preparation completed");
      } catch (e) {
        console.warn("Error during app preparation:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        console.log("Hiding splash screen");
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error hiding splash screen:", e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f2f2f2",
            },
            headerTintColor: "#222",
          }}
        >
          <Stack.Screen name="Manthan" component={OnBoardScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeDrawer}
          />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Fav" component={FavHome} />
          <Stack.Screen name="Flats" component={Flats} />
          <Stack.Screen name="My Leads" component={BrokerLeads} />
          <Stack.Screen name="Assign Leads" component={StaffLeads} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
