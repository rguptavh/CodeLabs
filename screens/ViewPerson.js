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
        onPress={() => {
          setPerson({});
          navigation.navigate("Home");
        }}
      >
        <Text style={{ color: "blue" }}> Back to Home</Text>
      </TouchableOpacity>
      <Text>View Person</Text>
      <Image source={person.image} style={styles.mainImage} />
      <Text>Name: {person.name}</Text>
      <Text>Relation: {person.relation}</Text>
      <Text>Notes: {person.notes}</Text>
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
  mainImage: {
    height: 200,
    width: "100%",
  },
});

export default ViewPerson;
