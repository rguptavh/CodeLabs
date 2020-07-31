import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Button, TextInput, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const storePersonData = async (person, navigation) => {
  try {
    let people = await AsyncStorage.getItem("people");

    if (people === null) {
      await AsyncStorage.setItem("people", JSON.stringify([person]));
    } else {
      people = JSON.parse(people);
      people.push(person);

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
        style={styles.button}
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
          <Text style={styles.button_type}>Add Person</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  /*containers*/
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C591ED',
    alignItems: "center",
    justifyContent: "center",
  },
  personPhoto: {
    height: 200,
    width: 200,
  },

  /*text*/
  title:{
    fontSize:30, 
    fontFamily:'RobotoBold', 
    color:'#FFF',
    letterSpacing:1,
    marginVertical:'10%',
  },
  type:{
    color:'white', 
    fontFamily:'Roboto', 
    fontSize:20,
    marginVertical:'3%'
  },
  button_type:{
    fontSize:23, 
    fontFamily:'RobotoBlack', 
    color:'#FFF', 
    letterSpacing:2
  },


/*input*/
  input:{
    backgroundColor:'white', 
    justifyContent: 'center',
    width:'60%',
    height:60,
    paddingHorizontal:'4%',
    marginVertical:'1%',
    fontSize:20
  },

/*button*/
  button:{
    backgroundColor: "#5867BA",
    alignItems: "center",
    borderRadius:50,
    padding: '3%',
    width:'60%',
    marginHorizontal:'3.5%',
    marginVertical:'10%'
},

});

export default AddPerson;
