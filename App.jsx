import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import Achievements from "./screens/Achievements";
import Events from "./screens/Event";
import Imagination from "./screens/special/Imagination";
import EventDetails from "./screens/EventDetails";

// importing auth
import { auth } from "./firebase/config";
import url from "./components/route/api";
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
        drawerStyle: {
          backgroundColor: "#162c63",
        },
        drawerLabelStyle: {
          color: "#f0c35f",
        },
        drawerActiveBackgroundColor: "#1a3a85",
        drawerInactiveTintColor: "#f0c35f",
        headerStyle: {
          backgroundColor: "#162c63",
        },
        headerTintColor: "#f0c35f",
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
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#162c63",
          },
          headerTintColor: "#f0c35f",
          contentStyle: {
            backgroundColor: "#162c63",
          },
        }}
      >
        <Stack.Screen name="Manthan Infracare" component={OnBoardScreen} />
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
        <Stack.Screen name="Achievements" component={Achievements} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Imagination" component={Imagination} />
        <Stack.Screen name="Event Details" component={EventDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}