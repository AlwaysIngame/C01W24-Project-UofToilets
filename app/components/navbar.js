import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardMenu from './userCardMenu'
import ScrollableList from './washroomList';
import { MapScreen } from './MapScreen';
import AddWashroomForm from './washroomScreen';
import InformationScreen from './InformationScreen/InformationScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasterSettingsScreen from './SettingsScreen/SettingsMaster';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BORDER_COLOR, COLOR_PRIMARY } from './styles';
import NewsFeed from './NewsFeed';

export default function TabNavigation(props) {

  const Tab = createBottomTabNavigator();
  
  const checkLoggedIn = async () => {
    loggedin = await AsyncStorage.getItem("logged_in");
    token = await AsyncStorage.getItem("session_token");
    if (loggedin != "true") {
      props.navigation.replace("Welcome");
    } else {
      if (token) {
        props.navigation.replace("BOTabs")
      }
    }
    
  }

  checkLoggedIn();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let size = 20;

            if (route.name === 'Home') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Card') {
              size = 22;
              iconName = focused ? 'card' : 'card-outline';
            } else if (route.name === 'Info') {
              size = 23;
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            // return <AntDesign name='' size={20} color={color} />;
          },
          tabBarActiveTintColor: COLOR_PRIMARY,
          tabBarInactiveTintColor: 'gray',
        })}>
      <Tab.Screen name="Home" component={MapScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="Card" component={CardMenu}/>
      <Tab.Screen name="Info" component={InformationScreen}/>
      <Tab.Screen name="Settings" children={(props) => <MasterSettingsScreen {...props} userType="user"/>}/>
      <Tab.Screen name="News" component={NewsFeed}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}