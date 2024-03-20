import { StyleSheet, Dimensions, View, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

function SettingsScreen({ navigation }){

  //Functions
  function getVersionNumber(){
    //TODO: Database fetch for version number
    return "1.0.0"; 
  };

  function openProfile(){
    //Placeholder, working on this on separate branch
    navigation.navigate('My Profile');
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

  //Render component
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={{flexDirection: 'row', marginTop: 4*vh, marginBottom: 3*vh,}}
                        onPress={openProfile}>
        <Text style={styles.buttonFont}>My Profile</Text>
        <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
      </TouchableOpacity>

      <View>
        <Text style={styles.sectionTitle}>APP SETTINGS</Text>

        <TouchableOpacity style={{flexDirection: 'row', marginBottom: 3*vh,}}
                          onPress={openLocationPerms}>
          <Text style={styles.buttonFont}>Location Permission</Text>
          <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionTitle}>PRIVACY AND TERMS</Text>
        <TouchableOpacity style={{flexDirection: 'row', marginBottom: 3*vh,}}
                          onPress={openPrivacyPolicy}>
          <Text style={styles.buttonFont}>Privacy Policy</Text>
          <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <TouchableOpacity style={{flexDirection: 'row', marginBottom: 3*vh,}}
                          onPress={openSupport}>
          <Text style={styles.buttonFont}>Request Support</Text>
          <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', marginTop: 2*vh,}}>
        <Text style={styles.buttonFont}>Version</Text>  
        <Text style={{position: 'absolute', right: 5, fontSize: 16,}}>{getVersionNumber()}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingRight: 12,
    paddingTop: 34,
    backgroundColor: 'white',
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
  },
  title: {
    color: '#ec5255',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 4*vh,
  },
  sectionTitle: {
    padding: 12,
    paddingLeft: 0,
    marginRight: 5,
    marginBottom: 2*vh,
    color: '#ec5255',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonFont: {
    fontSize: 16,
  },  
});

export default SettingsScreen;