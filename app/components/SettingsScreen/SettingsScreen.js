import { StyleSheet, Dimensions, View, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { version } from 'react';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

function SettingsScreen(){

  //Functions
  function getVersionNumber(){
    //TODO: Database fetch for version number
    return "1.0.0"; 
  };

  //Render component
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={{flexDirection: 'row',}}>
        <Text>My Profile</Text>
        <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
      </TouchableOpacity>

      <View>
        <Text style={styles.sectionTitle}>APP SETTINGS</Text>

        <TouchableOpacity style={{flexDirection: 'row',}}>
          <Text>Location Permission</Text>
          <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionTitle}>PRIVACY AND TERMS</Text>

        <TouchableOpacity style={{flexDirection: 'row',}}>
          <Text>Privacy Policy</Text>
          <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <TouchableOpacity style={{flexDirection: 'row',}}>
          <Text>Request Support</Text>
          <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row',}}>
        <Text>Version</Text>  
        <Text style={{position: 'absolute', right: 5,}}>{getVersionNumber()}</Text>
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
    padding: 10,
    paddingLeft: 0,
    marginRight: 5,
    color: '#ec5255',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;