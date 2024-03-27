import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { SERVER_URL } from '../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import UIButton from './ui/UIButton';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';



export default function SignupScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redundantPassword, setRedundantPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async (username, password) => {
    if (password != redundantPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
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
        AsyncStorage.setItem("logged_in", "true");
        props.navigation.navigate("BOTabs")
      } else {
        setErrorMessage(signupBody.error);
      }
    

    } catch (error) {
      setErrorMessage("Signup failure: " + error);
    }
  } 

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <View style={[styles.centeredScreenContainer]}>
        <Image style={[styles.iconImage, {alignSelf: 'center', height: 200, width: 100}]} source={require('../assets/CCC-GOHERE-CS5-1.jpg')}/>
        <Text style={[styles.sectionTitle, {textAlign: 'center'}]}>BUSINESS SIGN UP</Text>
        <TextInput placeholder='Business Username' onChangeText={setUsername}></TextInput>
        <TextInput secureTextEntry={true} placeholder='Password' onChangeText={setPassword}></TextInput>
        <TextInput secureTextEntry={true} placeholder='Re-Enter Password' onChangeText={setRedundantPassword}></TextInput>
        {errorMessage !== "" ? <Text style={{color: "#FF0000"}}>{errorMessage}</Text> : null}
        <UIButton title='Register' onPress={() => signUp(username, password)} height={50}/>
        <Text>Already have an account?</Text>
        <UIButton title='Login' onPress={() => props.navigation.navigate("Login")} height={50}/>
      </View>
    </KeyboardAvoidingView>
  );
}
