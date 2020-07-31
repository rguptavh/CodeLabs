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
        <Text style={styles.type} >Log-in to your account:</Text>
      </View>
    
   
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
       

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email.trim(), password)
              .then((user) => navigation.navigate("Home"))
              .catch((error) => ErrorHandler(error));
          }}
        >
          <Text style={styles.button_type}>Log-in</Text>
          </TouchableOpacity>

      <Text style={[styles.type, styles.type_space]}>Don't have an account yet? Sign-up!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.button_type}>Sign-up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  /*containers*/
  container: {
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /*text*/
  type:{
    fontSize:20,
    fontFamily:'RobotoItalic', 
    color:'#FFF',
    //marginBottom:'10%', //for spacing
  },
  type_space:{
    marginTop:'15%',
    marginBottom:'5%'
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
    width:'35%',
  },

  /*input*/
  input:{
    backgroundColor:'white', 
    justifyContent: 'center',
    width:'60%',
    height:60,
    paddingHorizontal:'4%',
    marginVertical:'10%',
    fontSize:20
  },

  
});

export default Login;
