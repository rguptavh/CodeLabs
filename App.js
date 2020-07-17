import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.rect}>
          <Text>logo here</Text>
        </View>
        
        <View style={styles.button}>
          <View style={styles.b1}>
            <Text>Sign-Up</Text> 
          </View>
          <View style={styles.b2}>
            <Text>Log-in</Text> 
          </View>

        </View>

        
      </View>
    );
  }
}

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
  },
  button:{
    flexDirection:"row",
    marginTop: '30%',
    width:'40%',
    height: '4%',
    
  },
  b1:{
    justifyContent: 'flex-start',
    backgroundColor: '#5867BA',
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
    marginLeft:'-15%'
  },
  b2:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
    backgroundColor: '#5867BA',
    marginLeft:'30%'
  },
});
