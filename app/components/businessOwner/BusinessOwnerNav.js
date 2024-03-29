import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../MapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyWashrooms from './MyWashrooms';
import MasterSettingsScreen from '../SettingsScreen/SettingsMaster';

export default function BusinessOwnerTabs(props) {

  const Tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="My Washrooms" component={MyWashrooms}/>
      <Tab.Screen name="Settings" children={() => <MasterSettingsScreen userType="businessOwner" navigation={props.navigation}/>}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}