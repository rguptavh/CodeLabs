import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>Create an account</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email.trim(), password)
            .then((user) => navigation.navigate("Home", { screen: "Home" }))
            .catch((error) => ErrorHandler(error));
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

export default Signup;
