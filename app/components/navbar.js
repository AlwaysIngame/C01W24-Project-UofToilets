import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestComponent from './testcomponent';

export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TestComponent} />
    </Tab.Navigator>
  );
}