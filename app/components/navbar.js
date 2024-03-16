import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestComponent from './testcomponent';
import UserAccessCard from './UserAccessCard';
import ScrollableList from './washroomList';
import { MapScreen } from './MapScreen';
import InformationScreen from './InformationScreen/InformationScreen';

export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="Card" component={UserAccessCard}/>
      <Tab.Screen name="Washrooms" component={ScrollableList}/>
      <Tab.Screen name="Info" component={InformationScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}