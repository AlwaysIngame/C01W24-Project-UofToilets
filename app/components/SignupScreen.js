import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SERVER_URL } from '../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SignupScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    
      const signupBody = await loginRes.json();

      if (loginRes.ok) {
        setErrorMessage("");
        AsyncStorage.setItem("session_token", signupBody.token);
        props.navigation.navigate("Tabs")
      } else {
        setErrorMessage(signupBody.error);
      }
    

    } catch (error) {
      setErrorMessage("Signup failure: " + error);
    }
  } 

  return (
    <View style={styles.container}>
      <Text>GoHere Logo</Text>
      <Text>Signup</Text>
      <TextInput placeholder='Username' onChangeText={setUsername}></TextInput>
      <TextInput placeholder='Password' onChangeText={setPassword}></TextInput>
      <TextInput placeholder='Re-Enter Password' onChangeText={setPassword}></TextInput>
      {errorMessage !== "" ? <Text style={{color: "#FF0000"}}>{errorMessage}</Text> : null}
      <Button title='Register' onPress={() => signUp(username, password)}/>
      <Text>Already Have an account?</Text>
      <Button title='Login' onPress={() => props.navigation.navigate("Login")}/>
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
