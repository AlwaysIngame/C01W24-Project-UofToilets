import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestComponent from './testcomponent';
import UserAccessCard from './UserAccessCard';
import ScrollableList from './washroomList';
import { MapScreen } from './MapScreen';

export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapScreen} />
      <Tab.Screen name="Card" component={UserAccessCard}/>
      <Tab.Screen name="Washrooms" component={ScrollableList}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}