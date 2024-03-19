import { StyleSheet, Dimensions, View, Text } from 'react-native';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const MasterSettingsScreen = () => {
  //Functions
  const Stack = createNativeStackNavigator();

  //Render
  return(
    <Stack.Navigator>
        <Stack.Screen name="Settings Overview" component={SettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="My Profile" component={ProfileScreen} options={{headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  );
};

export default MasterSettingsScreen;