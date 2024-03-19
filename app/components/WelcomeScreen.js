import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SERVER_URL } from '../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function WelcomeScreen(props) {

  return (
    <View style={styles.container}>
      <Text>GoHere Logo</Text>
      <Text>Welcome to GoHere</Text>
      <Button title='I am a User' onPress={() => {
        props.navigation.navigate("Tabs");
        AsyncStorage.setItem("logged_in", "true");
        AsyncStorage.setItem("session_token", null);
        }}/>
      <Button title='I am a Business Owner' onPress={() => props.navigation.navigate("Login")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
