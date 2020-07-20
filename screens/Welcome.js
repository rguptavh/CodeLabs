import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:40}}>Welcome!</Text>

      <View style={styles.rect}>
         <Image
          style={{width:100, height:100}}
            source={require('../assets/logo.png')}
         />
        </View>
      
      <View style={styles.button}>
          <TouchableOpacity
            style={styles.b1}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text>Log-in</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.b2}
            onPress={() => {
              navigation.navigate("Signup");
            }}
            >
          <Text>Sign-up</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rect: {
    width: 225,
    height: 225,
    backgroundColor: '#A43D8D', alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  button:{
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    /*backgroundColor:"#fff",*/
    marginTop:50
  },
  b1:{
    justifyContent: 'flex-start',
    marginRight:50,
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: 10,
    width:100
  },
  b2:{
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: 10,
    width:100
  }
});

export default Welcome;
