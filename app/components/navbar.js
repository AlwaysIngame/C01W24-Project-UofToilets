import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardMenu from './userCardMenu'
import ScrollableList from './washroomList';
import { MapScreen } from './MapScreen';
import InformationScreen from './InformationScreen/InformationScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MasterSettingsScreen from './SettingsScreen/SettingsMaster';

export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="Card" component={CardMenu} options={{headerShown: false}}/>
      <Tab.Screen name="Info" component={InformationScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Settings" component={MasterSettingsScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}