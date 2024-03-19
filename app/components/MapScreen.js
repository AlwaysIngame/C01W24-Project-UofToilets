import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import ScrollableList from './washroomList';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export function MapScreen({ washroomList }) {

  const [location, setLocation] = useState(null);
  const [isRegionChanged, setRegionChanged] = useState(false);
  const sheetRef = useRef(null);
  const snapPoints = ['14%', '30%', '90%'];

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
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={{ display: 'flex', flexDirection: "row", position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }}>
        {isRegionChanged ? <View style={styles.searchButton}><Button title='Search this area' onPress={searchArea} /></ View> : null}
        <BottomSheet
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollableList onSearchPress={handleSearchPress} />
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
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
    position: 'relative',
    alignItems: 'center',
    width: '40%',
    top: 50,
  }
});
