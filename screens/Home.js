import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Text, View, Button, FlatList, Image, StyleSheet } from "react-native";
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
      <Text>Home</Text>
      <Image
        source={{
          uri:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
        style={styles.sliderImage}
      />
      <Text>All People</Text>
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
      <Button
        title="Take a photo"
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
        style={styles.cameraButton}
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
  cameraButton: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  sliderImage: {
    height: 200,
    width: "100%",
  },
  peopleList: {
    width: "100%",
  },
});

export default Home;
