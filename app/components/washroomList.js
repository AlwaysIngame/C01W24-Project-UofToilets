import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import SearchBar from './SearchBar'; 

const ScrollableList =  ({ washrooms }) => {
  const [filteredItems, setFilteredItems] = useState(washrooms);

  return (
    <View style={styles.container}>
      <SearchBar items={washrooms} setFilteredItems={setFilteredItems} />
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
