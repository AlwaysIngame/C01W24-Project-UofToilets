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
import { SERVER_URL } from '../../src/constants';

export default function MyWashrooms(props) {

    const [washroomList, setWashroomList] = useState([]);

    const queryWashrooms = async () => {
        const washroomReq = await fetch(`${SERVER_URL}/getUserWashrooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await AsyncStorage.getItem("session_token")}`
            }
        });
    
        const washroomReqBody = await washroomReq.json();
        if (washroomReqBody.error) {
            console.log(washroomReqBody.error);
            // Do some error handling
        }
        console.log(washroomReqBody);
        setWashroomList(washroomReqBody.response);
    }

    queryWashrooms();

    return (
    <View>
        <WashroomList washrooms={washroomList}/>
        <Button style={{position: "absolute"}} title='Add Washroom'/>
    </View>
    );
}