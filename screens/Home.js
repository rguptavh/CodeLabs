import React from "react";
import { Text, View,  Image, FlatList, StyleSheet,TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import Item from "../components/Item";

  /* NOTES: (Miz)
  ** PeopleList/FlatList Height property isn't working and I can't seem to get the camera banner to have a background
  ** I want to format the FlatList so that the avatar and name would be in one line but I think I have to rearrange the code, and I'm afraid I might mess something up
  */

const peopleData = [
  {
    id: "1",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Vatsal Mehta",
    relation: "Friend",
  },
  {
    id: "2",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Ewemiz Insigne",
    relation: "Friend",
  },
  {
    id: "3",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Rahul Gupta",
    relation: "Friend",
  },
  {
    id: "4",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "4",
    relation: "Friend",
  },
  {
    id: "5",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "5",
    relation: "Friend",
  },
  {
    id: "6",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "6",
    relation: "Friend",
  },
];

export default class Home extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>
        
        {/******Slider Image*****/}
        <Image
          source={{
            uri:
              "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
          style={styles.sliderImage}
        />

        {/******List of People*****/}
        <Text style={styles.list_title}>All People</Text>
          
        <FlatList
          data={peopleData}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          style={styles.peopleList}
        />

          {/******Camera button*****/}

            <TouchableOpacity
              onPress={this._pickImage}
              style={styles.cameraButton}
            >
                <Image
              style={{width:40, height:40}}
              source={require('../assets/cam.png')}
                />
              </TouchableOpacity>


        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <Item image={item.image} name={item.name} relation={item.relation} />
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
}

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
