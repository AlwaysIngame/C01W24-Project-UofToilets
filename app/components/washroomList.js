import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const fetchWashrooms = () => {
  // simulate fetching data with coordinates
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Washroom 21', location: 'Location 1', coordinates: { latitude: 40.7128, longitude: -74.0060 } },
        { name: 'Washroom 2', location: 'Location 2', coordinates: { latitude: 34.0522, longitude: -118.2437 } },
        { name: 'Washroom 3', location: 'Location 3', coordinates: { latitude: 51.5074, longitude: -0.1278 } },
        // More washrooms when implemented
      ]);
    }, 2000);
  });
};

const fetchFavouriteWashrooms = () => {
  // simulate fetching data with coordinates
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Washroom 8', location: 'Location 1', coordinates: { latitude: 20.7128, longitude: -74.0060 } },
        { name: 'Washroom 9', location: 'Location 2', coordinates: { latitude: 34.0522, longitude: -128.2437 } },
        { name: 'Washroom 10', location: 'Location 3', coordinates: { latitude: 51.5074, longitude: -1.1278 } },
        // More washrooms when implemented
      ]);
    }, 2000);
  });
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
};

const ScrollableList = (props) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); // State variable for favorite washrooms

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchData = isFavourite ? fetchFavouriteWashrooms() : fetchWashrooms();

      fetchData.then((data) => {
        const sortedData = data.map(item => ({
          ...item,
          distance: getDistance(userLocation.latitude, userLocation.longitude, item.coordinates.latitude, item.coordinates.longitude)
        })).sort((a, b) => a.distance - b.distance);

        setItems(sortedData);
      });
    }
  }, [userLocation, isFavourite]);

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleFavouritesPress = () => {
    setIsFavourite(!isFavourite); // Toggle between favorite and regular washrooms
  };

  return (
    <View style={styles.container}>
      {/* Favourites Button */}
      <TouchableOpacity 
        style={[styles.favouritesButton, isFavourite ? styles.favouritesButtonActive : styles.favouritesButtonInactive]} 
        onPress={handleFavouritesPress}
        activeOpacity={0.5} // Adjust opacity when pressed
      >
        <Text style={styles.favouritesButtonText}>Favourites</Text>
      </TouchableOpacity>
      
      {/* Search Input */}
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search for a washroom..."
        onFocus={props.onSearchPress}
      />
      
      {/* Washrooms List */}
      <ScrollView style={{ flex: 1 }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationLabel}>Location:</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
              <Text style={styles.distance}>Distance: {Number(item.distance).toFixed(2)} km</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noItems}>No washrooms found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    position: 'relative', // Ensure proper positioning of child elements
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
    paddingBottom: 20,
    marginTop: 15,
    borderBottomWidth: 2, 
    borderColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    marginTop: 50, // Adjust the top margin to create space for the button
  },
  noItems: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  name: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationLabel: {
    marginRight: 5,
  },
  location: {
    flex: 1,
  },
  favouritesButton: {
    position: 'absolute',
    top: 10, // Adjust the top position here
    right: 10, // Move the button to the right side
    zIndex: 1,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    opacity: 0.5, // Translucent opacity when not pressed
  },
  favouritesButtonActive: {
    // Add styles for active button
    opacity: 1, // Higher opacity when pressed
    backgroundColor: 'orange', // Change color to orange when pressed
  },
  favouritesButtonInactive: {
    // Add styles for inactive button
    opacity: 0.5, // Translucent opacity when not pressed
  },
  favouritesButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ScrollableList;
