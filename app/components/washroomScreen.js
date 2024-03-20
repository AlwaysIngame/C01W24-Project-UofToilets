import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddWashroomForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [availability, setAvailability] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', { name, location, capacity, accessibility, availability });
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
      <Text style={styles.subheading}>Accessibility:</Text>
      <TextInput value={accessibility} onChangeText={setAccessibility} style={styles.input}>
      <select>
        <option value="Wheelchair">Wheelchair</option>
      </select>
      </TextInput>
      <Text style={styles.subheading}>Availability:</Text>
      <TextInput value={availability} onChangeText={setAvailability} style={styles.input} />
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