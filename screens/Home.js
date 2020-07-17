import React from "react";
import { Text, View, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
    </View>
  );
};

export default Home;
