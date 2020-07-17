import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import * as firebase from "firebase";

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .catch((error) => console.log(error.toString()));
};

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
