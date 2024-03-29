import { Settings, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import TabNavigation from './components/navbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './components/SignupScreen';
import WelcomeScreen from './components/WelcomeScreen';
import BusinessOwnerTabs from './components/businessOwner/BusinessOwnerNav';
import SettingsScreen from './components/SettingsScreen/SettingsScreen';
import AddWashroom from './components/businessOwner/AddWashroom';
import WashroomScreen from './components/washroomScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Tabs' screenOptions={{animationEnabled: true, navigationBarColor: "#FFFFFF"}}>
        <Stack.Screen name="Tabs" component={TabNavigation} options={{headerShown: false}}/>
        <Stack.Screen name="BOTabs" component={BusinessOwnerTabs} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddWashroom" component={WashroomScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
