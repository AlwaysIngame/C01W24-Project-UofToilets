import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SERVER_URL } from '../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    
      const loginBody = await loginRes.json();

      if (loginRes.ok) {
        setErrorMessage("");
        AsyncStorage.setItem("session_token", loginBody.token);
        props.navigation.navigate("Tabs");
      } else {
        setErrorMessage(loginBody.error);
      }
    

    } catch (error) {
      setErrorMessage("Login failure: " + error);
    }
  } 



  return (
    <View style={styles.container}>
      <Text>GoHere Logo</Text>
      <TextInput placeholder='Username' onChangeText={setUsername}></TextInput>
      <TextInput placeholder='Password' onChangeText={setPassword}></TextInput>
      {errorMessage !== "" ? <Text style={{color: "#FF0000"}}>{errorMessage}</Text> : null}
      <Button title='Login' onPress={() => login(username, password)}/>
      <Text>Dont have an account?</Text>
      <Button title='Sign up' onPress={() => props.navigation.navigate("Signup")}/>
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
