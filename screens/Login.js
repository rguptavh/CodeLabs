import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{marginBottom:'5%'}}>
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

      <View style={{marginTop:'5%'}}>
        <Button
          title="Login"
          color='#5867BA'
          onPress={() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email.trim(), password)
              .then((user) => navigation.navigate("Home"))
              .catch((error) => ErrorHandler(error));
          }}
        />
      </View>

      <View style={{marginTop:'3%'}}>
        <Button
          title="Sign up"
          color='#5867BA'
          onPress={() => {
            navigation.navigate("Signup");
          }}
        />
      </View>

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
    margin:'1%', 
    backgroundColor:'white', 
    padding:'1%'
  },
  error: {
    color: "red",
  },
});

export default Login;
