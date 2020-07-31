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
            <Text style={styles.type}>{props.name}</Text>
            <Text style={styles.type}>{props.relation}</Text>
          </View>
        </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  /*containers*/
  personPhoto: { 
    height: 100, 
    width: 100,
    justifyContent: 'flex-start',
  },
  container:{
    flex: 1,
    backgroundColor:"#C591ED",
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

  /*text*/
  type:{
    color:'black', 
    fontFamily:'RobotoBold', 
    letterSpacing:1,
    fontSize:23,
    justifyContent: 'flex-end',
    margin:'3%',
  },
});

export default Item;
