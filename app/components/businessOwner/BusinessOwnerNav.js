import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardMenu from '../userCardMenu'
import ScrollableList from '../washroomList';
import { MapScreen } from '../MapScreen';
import InformationScreen from '../InformationScreen/InformationScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyWashrooms from './MyWashrooms';

export default function BusinessOwnerTabs(props) {

  const Tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="My Washrooms" component={MyWashrooms}/>
      <Tab.Screen name="Account" component={InformationScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}