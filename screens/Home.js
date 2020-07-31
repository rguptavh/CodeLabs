import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import Item from "../components/Item";

const getPeople = async () => {
  let people = [];
  try {
    people = await AsyncStorage.getItem("people");

    people != null ? (people = JSON.parse(people)) : (people = []);
  } catch (error) {
    //console.log("Error: " + error);
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

const uriToBlob = async (uri) => {
  //console.log("Blob start");
  const blob = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };

    // this helps us get a blob
    xhr.responseType = "blob";

    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  //console.log("Blob made");
  return blob;
};

const findFace = async (image) => {
  try {
    //console.log("start res");
    let res = await fetch(
      "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&recognitionModel=recognition_01&detectionModel=detection_01",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "634cbfc0e0ef4a389d31e8ea87f19a23",
        },
        body: image,
      }
    );
    res = await res.json();
    //console.log("finish res");
    //console.log(res);
    //console.log("log after res log");

    if (res.length != 0) {
      const id = res[0].faceId;
      const data = {
        faceId: id,
        FaceListId: "email",
        maxNumOfCandidatesReturned: 1,
        mode: "matchPerson",
      };

      let person = await fetch(
        "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/findsimilars",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "634cbfc0e0ef4a389d31e8ea87f19a23",
          },
          body: JSON.stringify(data),
        }
      );
      person = await person.json();
      //console.log(person);
      if (person.error) {
        //console.log("Error Face");
        return "New";
      }
      //console.log("Done");
      return JSON.stringify(person) === JSON.stringify([])
        ? "New"
        : person[0].persistedFaceId;
    }
  } catch (error) {
    //console.log(error);
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
    //   //console.log("Cleared people!");
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

      <Text style={styles.list_title}>All People</Text>

      {data != [] ? (
        <View style={{ flex: 1, width: "110%", backgroundColor: "#A43D8D" }}>
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
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={async () => {
          try {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              // allowsEditing: true,
              // aspect: [1, 1],
              quality: 1,
            });
            if (!result.cancelled) {
              //console.log(result);
              // const edited = editImage(result.uri);
              //console.log("Start m");
              const manipResult = await ImageManipulator.manipulateAsync(
                result.uri,
                [],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
              );
              //console.log("Manipulated");

              const blob = await uriToBlob(manipResult.uri);

              if (blob) {
                //console.log(blob);
                //console.log("Value exists");
                const faceKnown = await findFace(blob);
                //console.log(faceKnown);
                if (faceKnown === "New") {
                  //console.log("Navigating...");
                  navigation.navigate("AddPerson", {
                    uri: result.uri,
                  });
                } else {
                  let person = {};
                  //console.log(data);
                  for (let i of data) {
                    if (i.persistedFaceId === faceKnown) {
                      person = i;
                      break;
                    }
                  }
                  //console.log(person);
                  navigation.navigate("KnownPerson", {
                    uri: result.uri,
                    person: person,
                  });
                }
              }

              // Alert.alert("", "Do you know this person?", [
              //   {
              //     text: "Yes",
              //     onPress: () =>
              //       navigation.navigate("KnownPerson", {
              //         uri: result.uri,
              //       }),
              //   },
              //   {
              //     text: "No",
              //     onPress: () =>
              //       navigation.navigate("AddPerson", {
              //         uri: result.uri,
              //       }),
              //   },
              // ]);
            }
          } catch (error) {
            //console.log(error);
          }
        }}
      >
        <Image
          style={{width:60, height:60}}
          source={require('../assets/cam.png')}
        />
        <Text style={styles.type}>Take a picture!</Text>
      </TouchableOpacity> 
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
