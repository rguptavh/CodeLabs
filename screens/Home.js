import React from "react";
import { Text, View, Button, Image, FlatList, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import Item from "../components/Item";

const peopleData = [
  {
    id: "1",
    // image: null,
    name: "Vatsal Mehta",
    relation: "friend",
  },
  {
    id: "2",
    // image: null,
    name: "Ewemiz Insigne",
    relation: "friend",
  },
  {
    id: "3",
    // image: null,
    name: "Rahul Gupta",
    relation: "friend",
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
        <Text>Home</Text>
        <Image
          source={{
            uri:
              "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
          style={styles.sliderImage}
        />
        <FlatList
          data={peopleData}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
        <Button
          title="Take a photo"
          onPress={this._pickImage}
          style={styles.cameraButton}
        />
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      </View>
    );
  }

  renderItem({ item }) {
    return <Item name={item.name} relation={item.relation} />;
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
        aspect: [4, 3],
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
});
