import { StyleSheet, Dimensions, View, Text } from 'react-native';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BusinessProfile } from '../businessOwner/BusinessProfile';


const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const MasterSettingsScreen = ({ navigation, userType }) => {
  //Functions
  const Stack = createNativeStackNavigator();
  //Render
  return(
    <Stack.Navigator>
        <Stack.Screen name="Settings Overview" children={() => <SettingsScreen userType={userType} navigation={navigation}/>} options={{headerShown: false}}/>
        <Stack.Screen name="My Profile" component={ProfileScreen} options={{headerTitleAlign: 'left', headerShown: false}}/>
        <Stack.Screen name="Business Profile" component={BusinessProfile} options={{headerTitleAlign: 'left', headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MasterSettingsScreen;