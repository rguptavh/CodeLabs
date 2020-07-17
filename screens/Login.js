import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text>Login to your account</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password)
            // .then((user) => navigation.navigate("Home"))
            .catch((error) => ErrorHandler(error));
        }}
      />
      <Button
        title="Sign up"
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
