import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from "react-native";

const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.logo}>
         <Image
          style={{width:200, height:200}}
          source={require('../assets/logo.png')}
         />
        </View>
      
      <View style={styles.button_flex}>
          <TouchableOpacity
            style={[styles.button, styles.button_login]}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.button_type}>Log-in</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={[styles.button, styles.button_signup]}
            onPress={() => {
              navigation.navigate("Signup");
            }}
            >
          <Text style={styles.button_type}>Sign-up</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  /*containers*/
  container: {
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
    marginTop: '20%',
  },

  /*text*/
  title:{
    fontSize:30, 
    fontFamily:'RobotoBold', 
    color:'#FFF',
    letterSpacing:1
  },
  button_type:{
    fontSize:23, 
    fontFamily:'RobotoBlack', 
    color:'#FFF', 
    letterSpacing:2
  },

  /*buttons*/
  button_flex:{
    flexDirection:"row",
  },
  button:{
    backgroundColor: "#5867BA",
    alignItems: "center",
    borderRadius:50,
    padding: '3%',
    width:'35%',
    marginHorizontal:'3.5%'
  },
  button_login:{
    justifyContent: 'flex-start',
  },
  button_signup:{
    justifyContent: 'flex-end',
  }
});

export default Welcome;
