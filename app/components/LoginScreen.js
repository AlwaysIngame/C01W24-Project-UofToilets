import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SERVER_URL } from '../constants';



export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (username, password) => {
    try {

      const loginRes = await fetch(`${SERVER_URL}/loginUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
      })
    
      if (loginRes.ok) {
        console.log(":)")
      } else {
        console.log(":(")
      }
    
      const loginBody = await loginRes.json();

    } catch (error) {
      console.log("Login failure: " + error);
    }
  } 

  const signUp = async (username, password) => {
    try {
      
      const loginRes = await fetch(`${SERVER_URL}/registerUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
      })
    
      if (loginRes.ok) {
        console.log(":)")
      } else {
        console.log(":(")
      }
    
      const loginBody = await loginRes.json();

    } catch (error) {
      console.log("Login failure: " + error);
    }
  } 

  return (
    <View style={styles.container}>
      <Text>GoHere Logo</Text>
      <TextInput placeholder='Username' onChangeText={setUsername}></TextInput>
      <TextInput placeholder='Password' onChangeText={setPassword}></TextInput>
      <Button title='Login' onPress={() => login(username, password)}/>
      <Text>Dont have an account?</Text>
      <Button title='Sign up' onPress={() => signUp(username, password)}/>
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
