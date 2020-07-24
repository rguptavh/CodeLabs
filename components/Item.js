import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ViewPerson", { uri: props.image })}
    >
      <Image source={{ uri: props.image }} style={styles.personPhoto} />
      <Text>{props.name}</Text>
      <Text>{props.relation}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  personPhoto: { height: 50, width: 50 },
});

export default Item;
