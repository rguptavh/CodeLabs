import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{marginBottom:-20}}>
        <Text>Login to your account</Text>
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
          <Text>Log-in</Text>
          </TouchableOpacity>

      <Text style={{marginTop:50, marginBottom:-55}}>Don't have an account yet? Sign-up!</Text>

        <TouchableOpacity
          style={styles.b1}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text>Sign-Up</Text>
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
    marginTop:80, 
    backgroundColor:'white', 
    paddingLeft:17,
  },
  b1:{
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: 10,
    width:100,
    marginTop:70
  },
});

export default Login;
