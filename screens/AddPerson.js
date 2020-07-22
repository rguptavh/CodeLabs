import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const storePersonData = async (person, navigation) => {
  try {
    let people = await AsyncStorage.getItem("people");
    // console.log("People gotten: " + people);

    if (people === null) {
      await AsyncStorage.setItem("people", JSON.stringify([person]));
    } else {
      // console.log("People: " + people);
      people = JSON.parse(people);
      // console.log("JSON parsed people: " + people);
      people.push(person);
      // console.log("Person added to people: " + people);
      // console.log("Stringified people: " + JSON.stringify(people));
      await AsyncStorage.removeItem("people");
      await AsyncStorage.setItem("people", JSON.stringify(people));
    }
    console.log("Added Person!");

    navigation.navigate("Home");
  } catch (error) {
    console.log(error);
  }
};

const AddPerson = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [notes, setNotes] = useState("");

  // const { chosenPhoto } = route.params;
  // console.log(route.params);

  const image = route.params;

  return (
    <View style={styles.container}>
      <Text>Add a person</Text>
      <Image source={image} style={styles.personPhoto} />
      <Text>This person looks new</Text>
      <Text>What's their name?</Text>
      <TextInput placeholder="Name" onChangeText={(name) => setName(name)} />
      <Text>How are you related to them?</Text>
      <TextInput
        placeholder="Relation"
        onChangeText={(relation) => setRelation(relation)}
      />
      <Text>Notes</Text>
      <TextInput
        placeholder="Notes"
        onChangeText={(notes) => setNotes(notes)}
      />
      <Button
        title="Add Person"
        onPress={() =>
          storePersonData(
            {
              name: name,
              image: image,
              relation: relation,
              notes: notes,
            },
            navigation
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  personPhoto: {
    height: 200,
    width: 200,
  },
});

export default AddPerson;
