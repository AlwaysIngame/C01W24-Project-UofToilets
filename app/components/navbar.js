import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestComponent from './testcomponent';
import UserAccessCard from './UserAccessCard';

export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TestComponent} />
      <Tab.Screen name="Card" component={UserAccessCard}/>
    </Tab.Navigator>
  );
}