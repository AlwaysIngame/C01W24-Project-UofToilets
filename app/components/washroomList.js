import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import SearchBar from './SearchBar'; 

const getDistance = (lat1, lon1, lat2, lon2) => {
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
};

const ScrollableList =  ({ washrooms }) => {
  const [items, setItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

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

    const sortedData = washrooms.map(item => ({
      ...item,
      distance: userLocation ? getDistance(userLocation.latitude, userLocation.longitude, item.latitude, item.longitude) : null
    })).sort((a, b) => a.distance - b.distance);

    setItems(sortedData);
    setFilteredItems(sortedData); 
  }, [userLocation, washrooms]);

  return (
    <View style={styles.container}>
      <SearchBar items={items} setFilteredItems={setFilteredItems} />
      <ScrollView style={{ flex: 1 }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationLabel}>Location:</Text>
                <Text style={styles.location}>{item.address}</Text>
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
