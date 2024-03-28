import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import ScrollableList from './washroomList';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import WashroomInfoView from './washroomInfo/WashroomInfoView';

export function MapScreen() {

  const washrooms = [
    {
      id: '1',
      name: 'Washroom 1',
      approved: true,
      owner_username: 'owner1',
      longitude: 43.65107,
      latitude: -79.347015,
      places_id: 'place1',
      address: 'Address 1',
    },
    {
      id: '2',
      name: 'Washroom 2',
      approved: true,
      owner_username: 'owner2',
      longitude: 43.65207,
      latitude: -79.348015,
      places_id: 'place2',
      address: 'Address 2',
    },
    // Add more washrooms as needed
  ];

  const [location, setLocation] = useState(null);
  const [isRegionChanged, setRegionChanged] = useState(false);
  const sheetRef = useRef(null);
  const snapPoints = ['14%', '33%', '60%'];

  const [sheetScreen, setSheetScreen] = useState('store');
  
  const [focusedWashroom, setFocusedWashroom] = useState({
    name: "Bob's Store",
    lat: 43.78415937787995,
    lon: -79.18757409699056,
    website: "www.bobsstore.com",
    phone: "416-123-4567",
    address: "1234 Bob Street",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation({
          coords: {
            latitude: 43.65107,
            longitude: -79.347015,
          },
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSearchPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2); // Snap to 90%
  }, []);

  const searchArea = useCallback(() => {
    setRegionChanged(false);
    // Update washrooms from database by taking current region
  })

  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={() => { setRegionChanged(true) }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker key="1" coordinate={{latitude: 43.78415937787995, longitude: -79.18757409699056}} title="UTSC" description='UT Shit Campus'/>
        </ MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={{ height: 'fit-content', top: Constants.statusBarHeight, display: 'flex', flexDirection: "column", position: 'absolute', width: '100%', justifyContent: 'center' }}>
        <View style={{ order: 1, paddingHorizontal: 10}}>
          <GooglePlacesAutocomplete placeholder='Search' query={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY, language: 'en' }} onPress={(data, details = null) => {console.log(data, details)}} />
        </ View>
        {isRegionChanged ? <View style={styles.searchButton}><Button title='Search this area' onPress={searchArea} /></ View> : null}
      </View>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        //onChange={handleSheetChange}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {sheetScreen == "store" ? <WashroomInfoView {... focusedWashroom} onClose={() => setSheetScreen('list')}
          ></WashroomInfoView> : 
          <ScrollableList washrooms={washrooms} onSearchPress={handleSearchPress} />
        }
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  searchButton: {
    order: 2,
    width: 'auto',
    alignSelf: 'center',
  }
});
