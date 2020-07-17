import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Item = (props) => {
  return (
    <View>
      <Image source={{ uri: props.image }} style={styles.personPhoto} />
      <Text>{props.name}</Text>
      <Text>{props.relation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  personPhoto: { height: 50, width: 50 },
});

export default Item;
