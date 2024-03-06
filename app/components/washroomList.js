import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const fetchWashrooms = () => {
  // Simulate fetching data with coordinates
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Washroom 1', location: 'Location 1', coordinates: { latitude: 40.7128, longitude: -74.0060 } },
        { name: 'Washroom 2', location: 'Location 2', coordinates: { latitude: 34.0522, longitude: -118.2437 } },
        { name: 'Washroom 3', location: 'Location 3', coordinates: { latitude: 51.5074, longitude: -0.1278 } },
        // Add more items as needed
      ]);
    }, 2000);
  });
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  // Calculate distance between two coordinates (simplified)
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
};

const ScrollableList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate user's current location
    const userLocation = { latitude: 37.7749, longitude: -122.4194 };

    fetchWashrooms().then((data) => {
      const sortedData = data.map(item => ({
        ...item,
        distance: getDistance(userLocation.latitude, userLocation.longitude, item.coordinates.latitude, item.coordinates.longitude)
      })).sort((a, b) => a.distance - b.distance);

      setItems(sortedData);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Location:</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <Text style={styles.distance}>Distance: {(item.distance || 0).toFixed(2)} km</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: '100%',
    paddingTop: 30,
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
});

export default ScrollableList;