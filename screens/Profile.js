import React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
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
      <Text style={styles.title}>Profile Screen</Text>

      <TouchableOpacity
        style={styles.b1}
        onPress={() => {
          navigation.navigate("Home");
        }}>
        <Text style={styles.type}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.b1}
        onPress={() => {
          signOut();
        }}>
        <Text style={styles.type}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C591ED',
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:25,
    margin:'10%',
  },
  type:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:15,
  },
  b1:{
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: '3%',
    width:'30%',
    margin:'10%',
  },
});

export default Profile;
