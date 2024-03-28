import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import UIButton from '../ui/UIButton';
import { Linking } from 'react-native';
import haversineDistance from 'haversine-distance';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Circle } from 'react-native-maps';
import CircleButton from '../ui/CircleButton';
import { Ionicons } from '@expo/vector-icons';

export default function WashroomInfoView({ name, lat, lon, website, phone, address, hours, bookmarked, navigation, onClose }) {

  const [location, setLocation] = useState({coords: {latitude: 0, longitude: 0}});
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [bookmarkedState, setBookmarkedState] = useState(bookmarked);
  
  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  const isOpen = () => {
    return true;
  }

  const closeView = () => {
    onClose();
  }
  
  const toggleBookmark = () => {
    // Toggle bookmark
    setBookmarkedState(!bookmarkedState);
  }
  
  const onDirections = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`)
  }

  const onWebsite = () => {
    Linking.openURL(website)
  }

  const onCall = () => {
    // Call the phone number
  }

  const onReportIssue = () => {
    // Report an issue
  }

  getLocation();

  return (
    <View style={washroomStyles.container}>
      <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
        <View>
          <Text style={washroomStyles.washroomTitle}>{name}</Text>
          <Text style={washroomStyles.washroomInfoText}>{address}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', gap: 12, paddingTop: 4}}>
          <CircleButton icon={<Ionicons name={bookmarkedState ? 'bookmark' : 'bookmark-outline'} size={18} color='gray' style={styles.iconStyle}/>} onPress={toggleBookmark}/>
          <CircleButton icon={<Ionicons name='close' size={20} color='gray' style={styles.iconStyle}/>} onPress={closeView}/>
        </View>
      </View>
      <View style={washroomStyles.hlist}>
        <UIButton title="Directions" stretch={true} emphasis={true} onPress={onDirections} />
        <UIButton title="Website" stretch={true} onPress={onWebsite} />
        <UIButton title="Call" stretch={true} onPress={onCall} />
      </View>
      <View style={[washroomStyles.hlist, {gap: 24, justifyContent: 'space-between', paddingBottom: 16}]}>
        <View>
          <Text style={washroomStyles.washroomInfoTextEmph}>HOURS</Text>
          {isOpen() ? <Text style={[washroomStyles.washroomInfoText, {color: 'green'}]}>Open</Text> :
           <Text style={washroomStyles.washroomInfoText}>Closed</Text>}
        </View>
        <View>
          <Text style={washroomStyles.washroomInfoTextEmph}>DISTANCE</Text>
          <Text style={washroomStyles.washroomInfoText}>{(haversineDistance({lat: lat, lon: lon}, location.coords) / 1000).toFixed(1) + " km"}</Text>
        </View>
        <UIButton title={"Report Issue"} stretch={true} onPress={() => {}} height='auto'/>
      </View>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
        return (
        <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}} key={day}>
          <Text style={{paddingTop: 8}}>{days[day]}</Text>
          <Text style={{paddingTop: 8}}>9:00AM - 9:00PM</Text>
        </View>
        );
      })}
    </View>
    );
  }

  export const washroomStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingLeft: 12,
      paddingRight: 12,
    },
    hlist: {
      marginTop: 12,
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
    },
    washroomTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingTop: 0,
    },
    washroomInfo: {
      padding: 12,
      backgroundColor: '#fff',
      margin: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#cccccc',
    },
    washroomInfoText: {
      fontSize: 16,
    },
    washroomInfoTextEmph: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },

  });