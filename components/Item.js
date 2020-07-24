import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.elements}
          onPress={() => navigation.navigate("ViewPerson", { uri: props.image })}>
          <View style={styles.col1}>
            <Image source={{ uri: props.image }} style={styles.personPhoto} />
          </View>

          <View style={styles.col2}>
            <Text style={styles.type}>Name: {props.name}</Text>
            <Text style={styles.type}>Relationship: {props.relation}</Text>
          </View>
        </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  personPhoto: { 
    height: 60, 
    width: 60,
    justifyContent: 'flex-start',
  },
  container:{
    flex: 1,
    backgroundColor:"#A43D8D",
    paddingHorizontal:'8%',
  },
  elements:{
    flexDirection: 'row',
    height:'100%',
    borderBottomWidth:1,
    borderBottomColor:"black"
  },
  col1:{
    padding:'3%',

  },
  col2:{
    justifyContent: 'center',
  },
  type:{
    color:'white', 
    fontFamily:'Roboto', 
    letterSpacing:2,
    fontSize:15,
    justifyContent: 'flex-end',
  },
});

export default Item;
