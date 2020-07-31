import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, AppLoading } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";

import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDICOVCCTInIttbO5j0oXdcxdp7wBilTkg",
  authDomain: "codelabs-f3f89.firebaseapp.com",
  databaseURL: "https://codelabs-f3f89.firebaseio.com",
  projectId: "codelabs-f3f89",
  storageBucket: "codelabs-f3f89.appspot.com",
  messagingSenderId: "406389826978",
  appId: "1:406389826978:web:c6260bc078fee5f2e17efb",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import Welcome from "./screens/Welcome";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AddPerson from "./screens/AddPerson";
import ViewPerson from "./screens/ViewPerson";
import KnownPerson from "./screens/KnownPerson";
console.disableYellowBox = true;
export default function App() {
  const AuthStack = createStackNavigator();
  const HomeStack = createDrawerNavigator();

  const AuthStackScreens = () => (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Loading"
        component={Loading}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeStackScreens}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="AddPerson"
        component={AddPerson}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="ViewPerson"
        component={ViewPerson}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="KnownPerson"
        component={KnownPerson}
      />
    </AuthStack.Navigator>
  );

const HomeStackScreens = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{ headerShown: false }}
      name="Home"
      component={Home}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name="Profile"
      component={Profile}
    />
  </HomeStack.Navigator>
);

  let [fontsLoaded] = useFonts({
    'RobotoBlack': require('./assets/fonts/Roboto-Black.ttf'),
    'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
    'RobotoItalic': require('./assets/fonts/Roboto-Italic.ttf'),
    'RobotoLight': require('./assets/fonts/Roboto-Light.ttf'),
    'RobotoMedium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf')
  });

  return (
    <NavigationContainer>
      <AuthStackScreens />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
