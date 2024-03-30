import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../MapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyWashrooms from './MyWashrooms';
import MasterSettingsScreen from '../SettingsScreen/SettingsMaster';
import { COLOR_PRIMARY } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import NewsFeed from '../NewsFeed';

export default function BusinessOwnerTabs(props) {

  const Tab = createBottomTabNavigator();

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
            } else if (route.name === 'My Washrooms') {
              size = 26;
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'News') {
              size = 22;
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            // return <AntDesign name='' size={20} color={color} />;
          },
          tabBarActiveTintColor: COLOR_PRIMARY,
          tabBarInactiveTintColor: 'gray',
        })}>
      <Tab.Screen name="Home" component={MapScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="My Washrooms" children={() => <MyWashrooms navigation={props.navigation}/>}/>
      <Tab.Screen name="News" children={() => <NewsFeed navigation={props.navigation}/>}/>
      <Tab.Screen name="Settings" children={() => <MasterSettingsScreen userType="businessOwner" navigation={props.navigation}/>}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}