import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from "react-native";

const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:(20*wid), color:'white', fontFamily:'RobotoBlack', letterSpacing:5}}>Welcome!</Text>

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
            <Text style={styles.type}>Log-in</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.b2}
            onPress={() => {
              navigation.navigate("Signup");
            }}
            >
          <Text style={styles.type}>Sign-up</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  type:{
    color:'white', 
    fontFamily:'RobotoBlack', 
    letterSpacing:2
  },
  container: {
    flex: 1,
    backgroundColor: '#C591ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rect: {
    width: '50%',
    height: '25%',
    backgroundColor: '#A43D8D', alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
    marginTop: '20%',
  },
  button:{
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  b1:{
    justifyContent: 'flex-start',
    marginRight:'10%',
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: '3%',
    width:'25%'
  },
  b2:{
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "#5867BA",
    padding: '3%',
    width:'25%',
  }
});

export default Welcome;
