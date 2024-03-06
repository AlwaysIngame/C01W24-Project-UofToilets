import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput } from 'react-native';

const fetchWashrooms = () => {
  // Simulate fetching data with coordinates
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

const getDistance = (lat1, lon1, lat2, lon2) => {
  // Calculate distance between two coordinates (simplified)
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
};

const ScrollableList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search for a washroom..."
      />
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
  search: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
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
});

export default ScrollableList;