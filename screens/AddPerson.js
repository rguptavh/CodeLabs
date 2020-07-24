import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Button, TextInput, TouchableOpacity} from "react-native";
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
      <Text style={styles.title}>Add a person</Text>

      <Image source={image} style={styles.personPhoto} />

      <Text style={styles.type}>This person looks new!</Text>

      <Text style={styles.type}>What's their name?</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        onChangeText={(name) => setName(name)}/>

      <Text style={styles.type}>How are you related to them?</Text>
      <TextInput
        style={styles.input} 
        placeholder="Relation"
        onChangeText={(relation) => setRelation(relation)}
      />

      <Text style={styles.type}>Notes</Text>
      <TextInput
        style={styles.input} 
        placeholder="Notes"
        onChangeText={(notes) => setNotes(notes)}
      />

      <TouchableOpacity
        style={styles.b1}
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
        }>
          <Text style={styles.b1_type}>Add Person</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C591ED',
    alignItems: "center",
    justifyContent: "center",
  },

  title:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:25,
    margin:'10%',
  },

  type:{
    color:'white', 
    fontFamily:'Roboto', 
    letterSpacing:1,
    fontSize:15,
    marginTop:'7%',
    marginBottom:'2%'
  },

  input:{
    justifyContent: 'center',
    width:'50%',
    height:45,
    backgroundColor:'white', 
    paddingHorizontal:'5%',
  },

  b1:{
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: '3%',
    width:'35%',
    margin:'10%',
  },

  b1_type:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:15,
  },

  personPhoto: {
    height: 200,
    width: 200,
  },
});

export default AddPerson;
