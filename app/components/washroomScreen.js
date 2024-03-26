import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Checkbox } from 'expo-checkbox';

const AddWashroomForm = () => {
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
      <Text style={styles.subheading}>Washroom Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.subheading}>Location of Washroom:</Text>
      <TextInput value={location} onChangeText={setLocation} style={styles.input} />
      <Text style={styles.subheading}>Capacity:</Text>
      <TextInput value={capacity} onChangeText={setCapacity} style={styles.input} keyboardType="numeric" />
      <Text style={styles.subheading}>Availability:</Text>
      <TextInput value={availability} onChangeText={setAvailability} style={styles.input} />
      <Text style={styles.subheading}>Accessibility:</Text>
      {accessibilityOptions.map(option => (
        <View key={option.value} style={styles.checkboxContainer}>
          <Checkbox
            value={accessibility.includes(option.value)}
            onValueChange={() => handleCheckboxChange(option.value)}
          />
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  subheading: {
    fontSize: 15,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default AddWashroomForm;
