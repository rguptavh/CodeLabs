import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

import ErrorHandler from "../components/ErrorHandler";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "10%" }}>
        <Text style={styles.type}>Create an account:</Text>
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
            .then(async (user) => {
              var data = { name: "email" };
              try {
                var res = await fetch(
                  "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/" +
                    "email",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "Ocp-Apim-Subscription-Key":
                        "634cbfc0e0ef4a389d31e8ea87f19a23",
                    },
                    body: JSON.stringify(data),
                  }
                );
              } catch (error) {
                console.log(error);
              }
              global.email = email;
              navigation.navigate("Home", { screen: "Home" });
            })
            .catch((error) => ErrorHandler(error));
        }}
      >
        <Text style={styles.type}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  type: {
    color: "white",
    fontFamily: "RobotoBlack",
    letterSpacing: 2,
    fontSize: 15,
  },

  container: {
    flex: 1,
    backgroundColor: "#C591ED",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    justifyContent: "center",
    width: "50%",
    height: "7%",
    backgroundColor: "white",
    paddingHorizontal: "4%",
    marginVertical: "15%",
  },

  b1: {
    marginTop: "10%",
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: "3%",
    width: "25%",
  },
});

export default Signup;
