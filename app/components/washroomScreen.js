import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, KeyboardAvoidingView,} from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView } from 'react-native';
import { styles as globalstyles } from './styles';
import UIButton from './ui/UIButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';
import { SERVER_URL } from '../src/constants';

const vh = Dimensions.get('window').height / 100;

const WashroomScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [accessibility, setAccessibility] = useState([]);
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [place_id, setPlaceId] = useState(undefined);

  // Get hours from google places id
  const getHours = async (placeId) => {
      const placeReq = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=current_opening_hours&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY}`);
      const placeReqBody = await placeReq.json();
      if (placeReqBody.error) {
          console.log(placeReqBody.error);
      }
      console.log(placeReqBody.result.current_opening_hours);
  }

  const onLocationSelect = (data, details) => {
    console.log("updated")
    setLatitude(details.geometry.location.lat);
    setLongitude(details.geometry.location.lng);
    setPlaceId(details.place_id);
  }

  const handleSubmit = async () => {
    const washroomData = {
      name: name,
      longitude: longitude,
      latitude: latitude,
      places_id: place_id,
      capacity: capacity,
      description: description,
      accessibility: accessibility,
    };
  
    try {
      console.log(washroomData);
      const response = await fetch(`${SERVER_URL}/addWashroom`, {
        method: 'POST',
        headers: token ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        } : {'Content-Type': 'application/json',},
        body: JSON.stringify(washroomData),
      });
  
      const responseBody = await response.json();
  
      if (responseBody.error) {
        console.error('Failed to submit washroom:', responseBody.error);
      } else {
        console.log('Washroom submitted successfully:', responseBody.response);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to submit washroom:', error);
    }
  };

  const accessibilityOptions = [
    { label: 'Wheelchair', value: 'Wheelchair' },
    { label: 'Elderly', value: 'Elderly' },
    { label: 'Visual Impairment', value: 'Visual Impairment' },
    { label: 'Hearing Impairment', value: 'Hearing Impairment' },
    { label: 'Mobility Impairment', value: 'Mobility Impairment' },
    { label: 'Cognitive Impairment', value: 'Cognitive Impairment' },
    { label: 'Other', value: 'Other' },
  ];

  const handleCheckboxChange = (option) => {
    if (accessibility.includes(option)) {
      setAccessibility(accessibility.filter(item => item !== option));
    } else {
      setAccessibility([...accessibility, option]);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container, {marginTop: 0}]}>
      <ScrollView
   nestedScrollEnabled={true}
   keyboardShouldPersistTaps='handled'
   contentContainerStyle={{ flexGrow: 1 }}>

        <Text style={styles.header}>Recommend a Washroom</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Washroom Name:</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>
        <View style={[styles.input, {zIndex: 10000, height: 170}]}>
          <Text style={[styles.label]}>Location of Washroom:</Text>
          <GooglePlacesAutocomplete
            placeholder="Address"
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY,
              language: "en",
            }}
            onPress={onLocationSelect}
            fetchDetails={true}
            disableScroll={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Capacity:</Text>
          <TextInput value={capacity} onChangeText={setCapacity} style={styles.input} keyboardType="numeric" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description (Optional):</Text>
          <TextInput value={description} onChangeText={setDescription} multiline={true} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Accessibility:</Text>
          {accessibilityOptions.map(option => (
            <View key={option.value} style={styles.checkboxContainer}>
              <Checkbox
                value={accessibility.includes(option.value)}
                onValueChange={() => handleCheckboxChange(option.value)}
              />
              <Text style={styles.checkboxLabel}>{option.label}</Text>
            </View>
          ))}
        </View>
        
        <UIButton title="Submit" onPress={handleSubmit} emphasis={true}/>
        <View style={{height: 24}}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ec5255',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: '#cccccc', 
    borderBottomWidth: 1,
    marginBottom: 2*vh,
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#efefef',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
  },
});

export default WashroomScreen;
