import React from "react";
import { Text, View, Button } from "react-native";
import * as firebase from "firebase";

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .catch((error) => console.log(error.toString()));
};

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default Profile;
