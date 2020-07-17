<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.rect}>
          <Text>logo here</Text>
        </View>
        
        <View style={styles.button}>
          <View style={styles.b1}>
            <Text>Sign-Up</Text> 
          </View>
          <View style={styles.b2}>
            <Text>Log-in</Text> 
          </View>

        </View>

        
      </View>
    );
  }
=======
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
>>>>>>> 27528bc1e2cb66378973566e096088f0dc98f22a
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
<<<<<<< HEAD
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  rect: {
    width: '50%',
    height: '30%',
    backgroundColor: '#A43D8D', alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    flexDirection:"row",
    marginTop: '30%',
    width:'40%',
    height: '4%',
    
  },
  b1:{
    justifyContent: 'flex-start',
    backgroundColor: '#5867BA',
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
    marginLeft:'-15%'
  },
  b2:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
    backgroundColor: '#5867BA',
    marginLeft:'30%'
=======
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> 27528bc1e2cb66378973566e096088f0dc98f22a
  },
});

export default App;
