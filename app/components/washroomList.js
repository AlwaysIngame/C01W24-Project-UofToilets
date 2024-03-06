import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const fetchWashrooms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Washroom 1', location: 'Location 1' },
        { name: 'Washroom 2', location: 'Location 2' },
        { name: 'Washroom 3', location: 'Location 3' },
        { name: 'Washroom 3', location: 'Location 3' },
      ]);
    }, 2000); 
  });
};

const ScrollableList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWashrooms().then((data) => {
      setItems(data);
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