import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.blank}>
        <Text style={styles.type} >Login to your account:</Text>
      </View>
    
      <View style={styles.input}>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

      <View style={styles.input}>
          <TextInput
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={styles.b1}
          onPress={() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email.trim(), password)
              .then((user) => navigation.navigate("Home"))
              .catch((error) => ErrorHandler(error));
          }}
        >
          <Text style={styles.type}>Log-in</Text>
          </TouchableOpacity>

      <Text style={styles.type1}>Don't have an account yet? Sign-up!</Text>

        <TouchableOpacity
          style={styles.b1}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.type}>Sign-Up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  type:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:15,
  },
  type1:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:15,
    marginTop:'10%',
  },
  container: {
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input:{
    justifyContent: 'center',
    width:'50%',
    height:'7%',
    backgroundColor:'white', 
    paddingHorizontal:'4%',
    marginVertical:'10%',
  },

  b1:{
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: 10,
    padding: '3%',
    width:'25%'
  },
});

export default Login;
