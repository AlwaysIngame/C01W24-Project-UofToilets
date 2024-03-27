import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardMenu from '../userCardMenu'
import ScrollableList from '../washroomList';
import { MapScreen } from '../MapScreen';
import InformationScreen from '../InformationScreen/InformationScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WashroomList from '../washroomListComponent';

export default function MyWashrooms(props) {

    const washroomListDummy = [
        {
            name: "Washroom 1",
        },
        {
            name: "Washroom 2",
        },
        {
            name: "Washroom 3",
        },
    ]

    return (
    <View>
        <WashroomList washrooms={washroomListDummy}/>
        <Button style={{position: "absolute"}} title='Add Washroom'/>
    </View>
    );
}