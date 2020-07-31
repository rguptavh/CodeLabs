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
        <Text style={styles.type}>Create an account:</Text>
    
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
  /*containers*/
  container: {
    flex: 1,
    backgroundColor: "#C591ED",
    alignItems: "center",
    justifyContent: "center",
  },
    
  /*text*/
  type:{
    fontSize:20,
    fontFamily:'RobotoItalic', 
    color:'#FFF',
    marginBottom:'10%', //for spacing
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
    marginTop: '10%' //for spacing
  }, 

  /*input*/
  input:{
    backgroundColor:'white', 
    justifyContent: 'center',
    width:'60%',
    height:60,
    paddingHorizontal:'4%',
    marginVertical:'15%',
    fontSize:20
  },

});

export default Signup;
