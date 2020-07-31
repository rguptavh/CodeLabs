import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const KnownPerson = ({ route, navigation }) => {
  const [notes, setNotes] = useState("");

  const image = route.params.uri;
  const personFace = route.params.person;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You know this person!</Text>

      <Image source={{ uri: image }} style={styles.personPhoto} />

      <Text style={styles.type}>This person looks like</Text>

      <Text style={styles.type}>{personFace.name}!</Text>

      <Text style={styles.type}>They're your {personFace.relation}</Text>

      <Text style={styles.type}>Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Notes"
        onChangeText={(notes) => setNotes(notes)}
      />

      <TouchableOpacity
        style={styles.b1}
        onPress={() => {
          console.log("Memory added!");
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.b1_type}>Add Memory</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#C591ED",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontFamily: "RobotoBlack",
    letterSpacing: 2,
    fontSize: 25,
    margin: "10%",
  },

  type: {
    color: "white",
    fontFamily: "Roboto",
    letterSpacing: 1,
    fontSize: 15,
    marginTop: "7%",
    marginBottom: "2%",
  },

  input: {
    justifyContent: "center",
    width: "50%",
    height: 45,
    backgroundColor: "white",
    paddingHorizontal: "5%",
  },

  b1: {
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: "3%",
    width: "35%",
    margin: "10%",
  },

  b1_type: {
    color: "white",
    fontFamily: "RobotoBlack",
    letterSpacing: 2,
    fontSize: 15,
  },

  personPhoto: {
    height: 200,
    width: 200,
  },
});

export default KnownPerson;
