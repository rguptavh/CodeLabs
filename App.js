import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! test ok so this is a thing</Text>
        <Text>Nextline</Text>
		<Text>Work</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
