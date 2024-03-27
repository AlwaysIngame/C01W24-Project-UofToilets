import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput } from 'react-native';
import * as Location from 'expo-location';

const WashroomList = (props) => {
  return (
    <View>
      <ScrollView>
        {props.washrooms.length > 0 ? (
          props.washrooms.map((washroom, index) => (
            <View key={index}>
                
              <Text>{washroom.name}</Text>
              <View>
                <Text>{washroom.address}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No washrooms found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default WashroomList;