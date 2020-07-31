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
        style={styles.button}
        onPress={() => {
          setPerson({});
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.button_type}>Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>View Person</Text>
      <Image source={person.image} style={styles.mainImage} />
      <Text style={styles.type}>This looks like <Text style={styles.bold}>{person.name}</Text>.</Text>
      <Text style={styles.type}>This is your <Text style={styles.bold}>{person.relation}</Text>.</Text>
      <Text></Text>
      <Text style={[styles.type,styles.bold]}>Notes:</Text>
      <Text style={styles.type}>{person.notes}</Text>
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
  mainImage: {
    height: 300,
    width: 300,
    margin:'10%'
  },

  /*text*/
  title:{
    fontSize:30, 
    fontFamily:'RobotoBold', 
    color:'#FFF',
    letterSpacing:1,
    marginTop:'10%',
  },
  type:{
    color:'white', 
    fontFamily:'Roboto', 
    fontSize:20,
    marginVertical:'1%'
  },
  bold:{
    fontFamily:'RobotoBold'
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
    width:'60%',
    marginHorizontal:'3.5%'
  },
});

export default ViewPerson;
