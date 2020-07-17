import React from "react";
import { Text, View } from "react-native";

const Item = (props) => {
  return (
    <View>
      {/* <Image source={{ uri: props.image }} /> */}
      <Text>{props.name}</Text>
      <Text>{props.relation}</Text>
    </View>
  );
};

export default Item;
