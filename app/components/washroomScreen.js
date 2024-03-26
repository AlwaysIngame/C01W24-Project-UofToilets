import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AddWashroomForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [availability, setAvailability] = useState('');
  const [showOptions, setShowOptions] = useState(false); // State to control visibility of options

  const handleSubmit = () => {
    console.log('Submitted:', { name, location, capacity, accessibility, availability });
  };

  const accessibilityOptions = [
    'Wheelchair',
    'Elderly',
    'Visual Impairment',
    'Hearing Impairment',
    'Mobility Impairment',
    'Cognitive Impairment',
    'Other',
  ];

  const handlePickerPress = () => {
    setShowOptions(true); // Show options when picker is pressed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommend a Washroom</Text>
      <Text style={styles.subheading}>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.subheading}>Location:</Text>
      <TextInput value={location} onChangeText={setLocation} style={styles.input} />
      <Text style={styles.subheading}>Capacity:</Text>
      <TextInput value={capacity} onChangeText={setCapacity} style={styles.input} keyboardType="numeric" />
      <Text style={styles.subheading}>Availability:</Text>
      <TextInput value={availability} onChangeText={setAvailability} style={styles.input} />
      <Text style={styles.subheading}>Accessibility:</Text>
      <DropDownPicker
        open={showOptions}
        value={accessibility}
        items={accessibilityOptions.map(option => ({ label: option, value: option }))}
        setOpen={setShowOptions}
        setValue={setAccessibility}
        style={styles.input}
        onPress={handlePickerPress} // Handle picker press event
      />
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
});

export default AddWashroomForm;
