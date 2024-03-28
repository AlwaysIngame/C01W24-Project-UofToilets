import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Button, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import ScrollableList from "./washroomList";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import WashroomInfoView from "./washroomInfo/WashroomInfoView";
import { SERVER_URL } from "../src/constants";
import haversineDistance from "haversine-distance";
import Constants from "expo-constants";

export function MapScreen() {
  let location = {
    latitude: 43.65107,
    longitude: -79.347015,
  };
  const [region, setRegion] = useState(null);
  const [isRegionChanged, setRegionChanged] = useState(false);
  const sheetRef = useRef(null);
  const snapPoints = ["14%", "33%", "60%"];

  const [sheetScreen, setSheetScreen] = useState("list");
  const [washrooms, setWashrooms] = useState([]);

  const [focusedWashroom, setFocusedWashroom] = useState({
    name: "Bob's Store",
    latitude: 43.78415937787995,
    longitude: -79.18757409699056,
    website: "www.bobsstore.com",
    phone: "416-123-4567",
    address: "1234 Bob Street",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setRegion({
          latitude: 43.65107,
          longitude: -79.347015,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    })();
  }, []);

  const handleSearchPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2); // Snap to 90%
  }, []);

  const markerPress = useCallback((washroom) => {
    setFocusedWashroom(washroom);
    console.log(washroom);
    setSheetScreen("store");
    sheetRef.current?.snapToIndex(2);
  }, []);

  const searchArea = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      location = {
        latitude: 43.65107,
        longitude: -79.347015,
      };
    } else {
      let loc = await Location.getCurrentPositionAsync({});
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    }
    setRegionChanged(false);
    try {
      console.log("fetch try");
      const getWashroomRes = await fetch(
        `${SERVER_URL}/getWashroomByLocation/${region.latitude}&${region.longitude}&10000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("fetch done");
      const getWashroomBody = await getWashroomRes.json();
      let washrooms = getWashroomBody.response;
      console.log(washrooms);
      for (let i = 0; i < washrooms.length; i++) {
        washrooms[i].distance =
          haversineDistance(washrooms[i], location) / 1000;
      }
      washrooms.sort((a, b) => a.distance < b.distance);
      console.log(washrooms);
      setWashrooms(washrooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region, { isGesture }) => {
            if (isGesture) setRegionChanged(true);
            setRegion(region);
          }}
          provider={PROVIDER_GOOGLE}
        >
          {washrooms.map((washroom) => (
            <Marker
              key={washroom.id}
              coordinate={{
                latitude: washroom.latitude,
                longitude: washroom.longitude,
              }}
              title={washroom.name}
              description={washroom.owner_username}
              onPress={() => markerPress(washroom)}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <View
        style={{
          height: "fit-content",
          top: Constants.statusBarHeight,
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View style={{ order: 1, paddingHorizontal: 10 }}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
          />
        </View>
        {isRegionChanged ? (
          <View style={styles.searchButton}>
            <Button title="Search this area" onPress={searchArea} />
          </View>
        ) : null}
      </View>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
      //onChange={handleSheetChange}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {sheetScreen == "store" ? (
            <WashroomInfoView
              {...focusedWashroom}
              onClose={() => setSheetScreen("list")}
            ></WashroomInfoView>
          ) : (
            <ScrollableList
              washrooms={washrooms}
              onSearchPress={handleSearchPress}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  searchButton: {
    order: 2,
    width: "auto",
    alignSelf: "center",
  },
});
