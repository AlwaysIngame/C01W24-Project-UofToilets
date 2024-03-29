import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Touchable } from 'react-native';
import SearchBar from './SearchBar'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BORDER_COLOR } from './styles';
import { getAddress } from '../src/googlePlaces';
import UIButton from './ui/UIButton';

const ScrollableList =  ({ washrooms, onSelect }) => {
  const [filteredItems, setFilteredItems] = useState(washrooms);

  

  // useEffect(() => {
  //   setAddresses();
  // }, []);

  return (
    <View style={styles.container}>
      {/* <SearchBar items={washrooms} setFilteredItems={setFilteredItems} /> */}
      <ScrollView>
        <View style={styles.listContainer}>  
        <View style={{borderBottomWidth: 1, borderColor: BORDER_COLOR }}></View>
          {washrooms.length > 0 ? (
            washrooms.map((washroom, index) => (
              <View style={{borderBottomWidth: 1, borderColor: BORDER_COLOR }} key={washroom.id}>
              <TouchableOpacity onPress={() => onSelect(washroom.id)}>
                <View style={styles.item}>
                  <Text style={styles.name}>{washroom.name}</Text>
                  <Text style={styles.location}>{washroom.address}</Text>
                  {/* <Text style={styles.location}>{washroom.address}</Text> */}
                  {washroom.distance ? <Text style={styles.distance}>{(washroom.distance).toFixed(1) + " km"}</Text> : null}
                </View>
              </TouchableOpacity>
              </View>
              
            ))
          ) : (
            <Text style={styles.noItems}>No washrooms found</Text>
          )}
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  listContainer: {
    gap: 12,
  },
  item: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    display: 'flex',
    fledDirection: 'collumn',
  },
  noItems: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default ScrollableList;
