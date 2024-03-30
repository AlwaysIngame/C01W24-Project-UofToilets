import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import UIButton from '../ui/UIButton';
import { Linking } from 'react-native';
import haversineDistance from 'haversine-distance';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Circle } from 'react-native-maps';
import CircleButton from '../ui/CircleButton';
import { Ionicons } from '@expo/vector-icons';
import { getAddress, getCoordinates, getHours, getPhone, getStatus, getWebsite } from '../../src/googlePlaces';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WashroomInfoView({ name, navigation, onClose, places_id, id }) {

  const [location, setLocation] = useState({coords: {latitude: 0, longitude: 0}});
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [hoursState, setHoursState] = useState([]);
  const [address, setAddress] = useState('');
  // const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});
  const [distance, setDistance] = useState(0);
  const [openNow, setOpenNow] = useState(true);
  const [operationalStatus, setOperationalStatus] = useState('OPERATIONAL');
  const [website, setWebsite] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const [bookmarkedState, setBookmarkedState] = useState(false);
  
  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  const closeView = () => {
    onClose();
  }
  
  const toggleBookmark = () => {
    // Toggle bookmark
    setBookmarkedState(!bookmarkedState);
    if (bookmarkedState) {
      AsyncStorage.getItem('bookmarks').then((bookmarks) => {
        bookmarks = JSON.parse(bookmarks);
        bookmarks = bookmarks.filter((bid) => bid !== id);
        AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        console.log("Removing bookmark")
      });
    } else {
      AsyncStorage.getItem('bookmarks').then((bookmarks) => {
        bookmarks = JSON.parse(bookmarks);
        if (!bookmarks) {
          bookmarks = [];
        }
        bookmarks.push(id);
        AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      });
    }
  }
  
  const onDirections = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`)
  }

  const onWebsite = () => {
    Linking.openURL(website)
  }

  const onCall = () => {
    // Call the phone number
  }

  const onReportIssue = async () => {
    console.log(await getStatus(places_id));
  }

  const updateParams = async () => {
    getHours(places_id).then((hours) => {
      setHoursState(hours[0]);
      setOpenNow(hours[1]);
    });
    getAddress(places_id).then((address) => {
      setAddress(address);
    });
    getCoordinates(places_id).then((coordinates) => {
      Location.getCurrentPositionAsync({}).then((location) => {
        setDistance(haversineDistance(location.coords, coordinates) / 1000);
      });
    });
    getStatus(places_id).then((status) => {
      if (status === 'CLOSED_TEMPORARILY') {
        setOperationalStatus('Temporarily Closed');
      } else if (status === 'CLOSED_PERMANENTLY') {
        setOperationalStatus('Permanently Closed');
      } else {
        setOperationalStatus('OPERATIONAL');
      }
    });

    getWebsite(places_id).then((website) => {
      setWebsite(website);
    });
    getPhone(places_id).then((phone) => {
      setPhoneNumber(phone);
    });

    AsyncStorage.getItem('bookmarks').then((bookmarks) => {
      bookmarks = JSON.parse(bookmarks);
      if (bookmarks) {
        setBookmarkedState(bookmarks.includes(id));
        console.log(bookmarks);
      }
    });


  };

  useEffect(() => {
    updateParams();
  }, []);


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
        {website ? <UIButton title="Website" stretch={true} onPress={onWebsite} /> : null}
        {phoneNumber ? <UIButton title="Call" stretch={true} onPress={onCall} /> : null}
      </View>
      <View style={[washroomStyles.hlist, {gap: 24, justifyContent: 'space-between', paddingBottom: 16}]}>
        {operationalStatus === 'OPERATIONAL' ? 
        <View>
          <Text style={washroomStyles.washroomInfoTextEmph}>HOURS</Text>
          {openNow ? <Text style={[washroomStyles.washroomInfoText, {color: 'green'}]}>Open</Text> :
           <Text style={[washroomStyles.washroomInfoText, {color: 'red'}]}>Closed</Text>}
        </View> :
        <View>
        <Text style={[washroomStyles.washroomInfoText, {maxWidth: 100}, {color: 'orange'}]}>{operationalStatus}</Text>
        </View>}
        <View>
          <Text style={washroomStyles.washroomInfoTextEmph}>DISTANCE</Text>
          <Text style={washroomStyles.washroomInfoText}>{distance.toFixed(1) + " km"}</Text>
        </View>
        <UIButton title={"Report Issue"} stretch={true} onPress={onReportIssue} height='auto'/>
      </View>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
        return (
        <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}} key={day}>
          <Text style={{paddingTop: 8}}>{days[day]}</Text>
          <Text style={{paddingTop: 8}}>{hoursState[day] ? hoursState[day] : "Unspecified"}</Text>
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
