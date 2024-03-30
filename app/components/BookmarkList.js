import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { SERVER_URL } from '../src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollableList from './washroomList';
import { getAddress } from '../src/googlePlaces';

const BookmarkList = ({ navigation, onSelect, onClose }) => {
  const [washrooms, setWashrooms] = useState([]);
  useEffect(() => {
    const fetchWashrooms = async () => {
      try {
        // AsyncStorage.getItem('bookmarks').then(async bids => {
        //   bids = JSON.parse(bids);
        //   console.log(bids)
        //   fetchedWashrooms = bids.map(async (id) => {
        //   const response = await fetch(`${SERVER_URL}/getWashroom/${id}`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     }});
        //   const washroom = await response.json();
        //   return washroom;
        //   })
          
        // }
        // ).then(washrooms => {console.log(washrooms)});
        let bids = await AsyncStorage.getItem('bookmarks');
        console.log(bids);
        bids = JSON.parse(bids);
        for (bid in bids){
          const response = await fetch(`${SERVER_URL}/getWashroom/${bids[bid]}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }});
          const washroom = await response.json();
          const address = await getAddress(washroom.response.places_id);
          washroom.response.address = address;
          setWashrooms(washrooms => [...washrooms, washroom.response]);
        }
      } catch (error) {
        console.error('Error fetching washrooms:', error);
      }
    };

    fetchWashrooms();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Washrooms</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollableList washrooms={washrooms} onSelect={onSelect}/>
      {/* <ScrollView style={{ flex: 1 }}>
        {washrooms.length > 0 ? (
          washrooms.map((washroom, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.name}>{washroom.name}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationLabel}>Location:</Text>
                <Text style={styles.location}>{washroom.address}</Text>
              </View>
              <Text style={styles.distance}>Distance: {Number(washroom.distance).toFixed(2)} km</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noItems}>No saved washrooms found</Text>
        )}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  closeButton: {
    alignSelf: 'flex-start',
  },
});

export default BookmarkList;