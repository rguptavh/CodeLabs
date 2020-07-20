import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
    <AuthStack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
    <AuthStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
    <AuthStack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
    <AuthStack.Screen options={{ headerShown: false }} name="Home" component={HomeStackScreens} />
  </AuthStack.Navigator>
);

const HomeStackScreens = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    <HomeStack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
  </HomeStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AuthStackScreens />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
