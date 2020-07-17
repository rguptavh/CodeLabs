import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>

      <View style={styles.rect}>
          <Text>logo here</Text>
        </View>
      
      <View style={styles.button}>
        <View style={styles.b1}>
          <Button
            title="Login"
            color='#5867BA'
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
        
        <View style={styles.b2}>
          <Button
            title="Sign Up"
            color='#5867BA'
            onPress={() => {
              navigation.navigate("Signup");
            }}
          />
        </View>
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
    width: '50%',
    height: '30%',
    backgroundColor: '#A43D8D', alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    marginTop: '5%'
  },
  button:{
    flexDirection:"row",
    width:'100%',
    /*backgroundColor:'white',*/
    alignItems: 'center',
    justifyContent: 'center',
   /* 
    width:'40%',
    height: '4%',
  */
  },
  b1:{
    justifyContent: 'flex-start',
    marginRight:'10%'
  },
  b2:{
    justifyContent: 'flex-end',
  }
});

export default Welcome;
