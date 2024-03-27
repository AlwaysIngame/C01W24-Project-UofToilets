import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIButton from './ui/UIButton';
import { styles } from './styles';



export default function WelcomeScreen(props) {

  const navUser = () => {
    props.navigation.replace("Tabs");
    AsyncStorage.setItem("logged_in", "true");
    AsyncStorage.setItem("session_token", "");
  }

  const navBO = () => props.navigation.navigate("Login")

  return (
    <View style={[styles.centeredScreenContainer]}>
        <View style={[styles.cardIcon, {alignSelf:'center'}]}>
          <Image style={styles.iconImage} source={require('../assets/CCC-GOHERE-CS5-1.jpg')}/>
        </View>
        <Text style={[styles.sectionTitle, {textAlign: 'center'}]}>WELCOME TO GOHERE</Text>
        <UIButton title="I am a User" onPress={navUser}/>
        <UIButton title="I am a Business Owner" onPress={navBO}/>
    </View>
  );
}
