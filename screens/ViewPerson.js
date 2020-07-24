import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

const getPeople = async (photo) => {
  let people = [];
  try {
    people = await AsyncStorage.getItem("people");

    people != null ? (people = JSON.parse(people)) : (people = []);
  } catch (error) {
    console.log("Error: " + error);
  }

  const pic = JSON.stringify(photo);
  for (let i = 0; i < people.length; i++) {
    if (JSON.stringify(people[i].image) === pic) {
      return people[i];
    }
  }
};

const ViewPerson = ({ route, navigation }) => {
  const [person, setPerson] = useState({});

  const photo = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const findPerson = () => {
        getPeople(photo).then((value) => {
          if (value != person) {
            setPerson(value);
          }
        });
      };

      if (JSON.stringify(person) === JSON.stringify({})) {
        return findPerson();
      }
    }, [photo])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.b1}
        onPress={() => {
          setPerson({});
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.b1_type}>Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>View Person</Text>
      <Image source={person.image} style={styles.mainImage} />
      <Text style={styles.type}>This looks like {person.name}</Text>
      <Text style={styles.type}>This is your {person.relation}.</Text>
      <Text></Text>
      <Text style={styles.type}>Notes:</Text>
      <Text style={styles.type}>{person.notes}</Text>
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

  mainImage: {
    height: 300,
    width: 300,
    margin:'10%'
  },

  title:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:25,
    marginTop:'10%',
  },

  type:{
    color:'white', 
    fontFamily:'Roboto', 
    letterSpacing:1,
    fontSize:15,
//    marginTop:'7%',
//    marginBottom:'2%'
    marginVertical:'1%'
  },

  b1:{
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: '3%',
    width:'45%',
  },

  b1_type:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2,
    fontSize:15,
  },
});

export default ViewPerson;
