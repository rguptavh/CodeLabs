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
        style={styles.button}
        onPress={() => {
          navigation.navigate("Home");
        }}>
        <Text style={styles.button_type}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          signOut();
        }}>
        <Text style={styles.button_type}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  /*container*/
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C591ED',
    alignItems: "center",
    justifyContent: "center",
  },

  /*text*/
  title:{
    fontSize:30, 
    fontFamily:'RobotoBold', 
    color:'#FFF',
    letterSpacing:1
  },
  button_type:{
    fontSize:23, 
    fontFamily:'RobotoBlack', 
    color:'#FFF', 
    letterSpacing:2
  },

  /*button*/
  button:{
    backgroundColor: "#5867BA",
    alignItems: "center",
    borderRadius:50,
    padding: '3%',
    width:'45%',
    marginVertical:'10%'
  },
});

export default Profile;
