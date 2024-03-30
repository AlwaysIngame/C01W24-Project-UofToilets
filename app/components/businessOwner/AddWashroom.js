import * as React from 'react';
import { Button, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import ScrollableList from '../washroomList';
import { styles } from '../styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';


export default function AddWashroom(props) {
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    let latitude;
    let longitude;
    let place_id;

    // Get hours from google places id
    const getHours = async (placeId) => {
        const placeReq = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=current_opening_hours&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY}`);
        const placeReqBody = await placeReq.json();
        if (placeReqBody.error) {
            console.log(placeReqBody.error);
        }
        console.log(placeReqBody.result.current_opening_hours);
    }

    const onLocationSelect = (data, details) => {
        latitude = details.geometry.location.lat;
        longitude = details.geometry.location.lng;
        place_id = details.place_id;
    }

    return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.centeredScreenContainer, {marginTop: 0}]}>
            <TextInput placeholder='Location Name' onChangeText={(e) => {setName(e)}}></TextInput>
            <GooglePlacesAutocomplete
            placeholder="Washrooms on your way..."
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY,
              language: "en",
            }}
            onPress={onLocationSelect}
            fetchDetails={true}
          />
            <TextInput placeholder='Description' onChangeText={(e) => {setDescription(e)}} multiline={true}></TextInput>
            
    </KeyboardAvoidingView>
    );
}