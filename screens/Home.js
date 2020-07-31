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

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const refreshList = navigation.addListener("focus", () => {
      getPeople().then((value) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>

      {/*
      <Image
        source={{
          uri:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
        style={styles.sliderImage}
      />
      */}

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
          style={{width:60, height:60}}
          source={require('../assets/cam.png')}
        />
        <Text style={styles.type}>Take a picture!</Text>
      </TouchableOpacity>

      <View style={styles.list_header}>
        <Text style={styles.list_title}>All People</Text>
      </View>

      {data != [] ? (
        <View style={{flex:1, width:'110%', backgroundColor:'#A43D8D',}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => data.indexOf(item).toString()}
            style={styles.peopleList}
          />
        </View>
      ) : (
        false
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  /*containers*/
  container: {
    flex: 1,
    backgroundColor: "#C591ED", // "all people" background
    alignItems: "center",
    justifyContent: "center",
  },
  header:{
    backgroundColor: "#A43D8D",
    alignItems: "center",
    justifyContent: "center",
    width:'100%',
    height:'12%',
    paddingTop:'5%', //to be replaced with specific header size
  },
  list_header:{
    width:'100%',
    backgroundColor:"#A43D8D",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    alignItems: "center",
    backgroundColor: "#C591ED",
    width:'100%',
    padding:'10%'
  },
  
  /*text*/
  title:{
    fontSize:35, 
    fontFamily:'Roboto', 
    color:'#FFF',
    letterSpacing:1
  },
  list_title:{
    color:'white', 
    fontFamily:'RobotoBold', 
    fontSize:20,
    margin:'3%',
  },
  type:{
    fontSize:20,
    fontFamily:'RobotoItalic', 
    color:'#FFF',
    //marginBottom:'10%', //for spacing
  },
});

export default Home;
