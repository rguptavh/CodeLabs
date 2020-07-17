import React from "react";
import { Stylesheet, View, Text, Button } from "react-native";

const Welcome = ({ navigation }) => {
  render()
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C591ED',
      alignItems: 'center',
      justifyContent: 'center',
    },
  )
};

export default Welcome;
