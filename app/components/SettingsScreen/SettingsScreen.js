import { StyleSheet, Dimensions, View, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';
import HorizontalButton from '../ui/HorizontalButton';

function SettingsScreen({ navigation, userType }){

  //Functions
  const versionNumber = "1.0.0";

  function openProfile(){
    //Placeholder, working on this on separate branch
    console.log(userType)
    if (userType === "businessOwner") {
      navigation.navigate('Business Profile');
    } else {
      navigation.navigate('My Profile');
    }
  }

  function openLocationPerms(){
    Linking.openSettings();
  }

  function openPrivacyPolicy() {
    Linking.openURL('https://crohnsandcolitis.ca/About-Us/Policies/Privacy-Policy').catch(err => console.error("Couldn't load page", err));
  }

  function openSupport(){
    Linking.openURL('mailto:gohere@crohnsandcolitis.ca')
  }

  const logoutAction = () => {
    AsyncStorage.setItem("session_token", "");
    AsyncStorage.setItem("logged_in", "false");
    navigation.replace("Welcome");
  }

  function openReview(){
    Linking.openURL('https://play.google.com/store/apps/details?id=com.GoHere.GoHere').catch(err => console.error("Couldn't load page", err));
  }

  //Render component
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> */}

      <Text style={styles.sectionTitle}>ACCOUNT</Text>
      <HorizontalButton title='My Profile' onPress={openProfile}/>
      <HorizontalButton title='Logout' onPress={logoutAction}/>

      <Text style={styles.sectionTitle}>APP SETTINGS</Text>
      <HorizontalButton title='Location Permission' onPress={openLocationPerms}/>

      <Text style={styles.sectionTitle}>PRIVACY AND TERMS</Text>
      <HorizontalButton title='Privacy Policy' onPress={openPrivacyPolicy}/>


      <Text style={styles.sectionTitle}>SUPPORT</Text>
      <HorizontalButton title='Request Support' onPress={openSupport}/>
      <HorizontalButton title='Submit Feedback' onPress={openReview}/>


      <View style={styles.hbutton}>
        <Text style={styles.buttonFont}>Version</Text>  
        <Text style={{fontSize: 16,}}>{versionNumber}</Text>
      </View>
      
    </View>
  );
};

export default SettingsScreen;