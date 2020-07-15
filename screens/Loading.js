import React from "react";
import { View, ActivityIndicator } from "react-native";
import * as firebase from "firebase";

const checkIfLoggedIn = ({ navigation }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    }
  });
};

const Loading = ({ navigation }) => {
  return (
    <View>
      <ActivityIndicator size="large" />
      {checkIfLoggedIn({ navigation })}
    </View>
  );
};

export default Loading;
