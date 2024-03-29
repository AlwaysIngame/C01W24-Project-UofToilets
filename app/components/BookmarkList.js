import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons


// Not sure abt backend/navigation aspect here so left it same as washroomlist
const BookmarkList = ({ washrooms }) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Washrooms</Text>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {washrooms.length > 0 ? (
            washrooms.map((item, index) => (
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
            <Text style={styles.noItems}>No saved washrooms found</Text>
          )}
        </ScrollView>
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