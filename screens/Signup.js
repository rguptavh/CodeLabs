import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{marginBottom:100}}>
        <Text>Create an account</Text>
      </View>
    
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />

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
              .createUserWithEmailAndPassword(email.trim(), password)
              .then((user) => navigation.navigate("Home", { screen: "Home" }))
              .catch((error) => ErrorHandler(error));
          }}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  input:{
    justifyContent: 'center',
    width:200,
    height:50,
    marginBottom:100, 
    backgroundColor:'white', 
    paddingLeft:17,
  },

  b1:{
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: 10,
    width:100
  },
  
});

export default Signup;
