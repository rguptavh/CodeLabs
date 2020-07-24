import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import Item from "../components/Item";

const getPeople = async () => {
  let people = [];
  try {
    people = await AsyncStorage.getItem("people");
    // console.log("People gotten HomeScreen: " + people);
    // console.log(people.map((person) => JSON.parse(person)));
    people != null ? (people = JSON.parse(people)) : (people = []);
  } catch (error) {
    console.log("Error: " + error);
  }
  return people;
};

const renderItem = ({ item }) => {
  return (
    <Item image={item.image.uri} name={item.name} relation={item.relation} />
  );
};

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

// const _pickImage = async ({ navigation }) => {
//   try {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.cancelled) {
//       navigation.navigate("AddPerson", {
//         uri: result.uri,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const refreshList = navigation.addListener("focus", () => {
      getPeople().then((value) => {
        // console.log("Previous State Data: ");
        // console.log(data);
        // console.log("Data Received from Storage: ");
        // console.log(value);
        if (value != data) {
          setData(value);
        }
      });
    });
  }, [navigation]);

  useEffect(() => {
    getPermissionAsync();
    // const clearAll = async () => {
    //   await AsyncStorage.removeItem("people");
    //   console.log("Cleared people!");
    // };
    // clearAll();
  }, []);

  // console.log("Current Data: ");
  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>
      <Image
        source={{
          uri:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
        style={styles.sliderImage}
      />

      <Text style={styles.list_title}>All People</Text>
      
      {data != [] ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => data.indexOf(item).toString()}
          style={styles.peopleList}
        />
      ) : (
        false
      )}
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={async () => {
          try {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.cancelled) {
              navigation.navigate("AddPerson", {
                uri: result.uri,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }}  
      >
        <Image
          style={{width:40, height:40}}
          source={require('../assets/cam.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  list_title:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:1,
    fontSize:20,
    margin:'5%',
  },
  title:{
    color:'white', 
    fontFamily:'Roboto', 
    letterSpacing:1,
    fontSize:25,
  },
  header:{
    alignItems: "center",
    justifyContent: "center",
    width:'110%',
    height:'7%',
    /* marginTop:-20, not really sure how to do this, have to look at other cellphone models */
    backgroundColor: "#A43D8D",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#C591ED",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: 15,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  sliderImage: {
    height: 200,
    width: "110%",
  },
  peopleList: {
    width: "110%",
    padding:10,
    backgroundColor:'red',
  },
});

export default Home;
