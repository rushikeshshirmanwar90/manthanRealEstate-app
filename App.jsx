import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Components
import CompletedProject from "./screens/project/CompletedProject";
import OnGoingProject from "./screens/project/OnGoingProject";
import UpComingProject from "./screens/project/UpComingProject";

import Login from "./screens/Login";
import Register from "./screens/Register";
import OnBoardScreen from "./screens/onBording";
import Details from "./screens/Details";
import FavHome from "./screens/FavHome";
import CustomDrawer from "./components/CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  const userName = "John Doe";
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
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
      <Drawer.Screen name="Completed Project" component={CompletedProject} />
      <Drawer.Screen name="UpComing Project" component={UpComingProject} />
      <Drawer.Screen name="OnGoing Project" component={OnGoingProject} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
