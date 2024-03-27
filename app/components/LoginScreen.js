import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SERVER_URL } from '../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import UIButton from './ui/UIButton';



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
        AsyncStorage.setItem("logged_in", "true");
        props.navigation.navigate("Tabs");
      } else {
        setErrorMessage(loginBody.error);
      }
    

    } catch (error) {
      setErrorMessage("Login failure: " + error);
    }
  } 



  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
    <View style={styles.centeredScreenContainer}>
      <Image style={[styles.iconImage, {alignSelf: 'center', height: 200, width: 100}]} source={require('../assets/CCC-GOHERE-CS5-1.jpg')}/>
      <Text style={[styles.sectionTitle, {textAlign: 'center'}]}>BUSINESS LOGIN</Text>
      <TextInput placeholder='Business Username' onChangeText={setUsername}></TextInput>
      <TextInput secureTextEntry={true} placeholder='Password' onChangeText={setPassword}></TextInput>
      {errorMessage !== "" ? <Text style={{color: "#FF0000"}}>{errorMessage}</Text> : null}
      <UIButton title='Login' onPress={() => login(username, password)} height={50} emphasis={true}/>
      <Text>Dont have an account?</Text>
      <UIButton title='Sign Up' onPress={() => props.navigation.navigate("Signup")} height={50}/>
    </View>
    </KeyboardAvoidingView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
