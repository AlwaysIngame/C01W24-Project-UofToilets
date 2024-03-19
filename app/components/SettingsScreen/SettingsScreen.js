import { StyleSheet, Dimensions, View, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const SettingsScreen = () => {

  //Functions

  //Render component
  return (
    <View>
      <Text>Settings</Text>

      <TouchableOpacity>
        <Text>My Profile</Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>

      <View>
        <Text>APP SETTINGS</Text>

        <TouchableOpacity>
          <Text>Location Permission</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>PRIVACY AND TERMS</Text>

        <TouchableOpacity>
          <Text>Privacy Policy</Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <Text>SUPPORT</Text>
        <TouchableOpacity>
          <Text>Request Support</Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Request Support</Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default SettingsScreen;