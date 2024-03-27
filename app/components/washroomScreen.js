import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions,} from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const vh = Dimensions.get('window').height / 100;

const WashroomScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [accessibility, setAccessibility] = useState([]);
  const [availability, setAvailability] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', { name, location, capacity, accessibility, availability });
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
    <View style={styles.container}>
      <Text style={styles.header}>Recommend a Washroom</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Washroom Name:</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location of Washroom:</Text>
        <TextInput value={location} onChangeText={setLocation} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Capacity:</Text>
        <TextInput value={capacity} onChangeText={setCapacity} style={styles.input} keyboardType="numeric" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Availability:</Text>
        <TextInput value={availability} onChangeText={setAvailability} style={styles.input} />
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
      <View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
