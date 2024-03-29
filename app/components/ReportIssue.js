import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ReportIssue({props}) {
  const submitIssue = (issue) => {
    // SEND ISSUE TO BACKEND HERE
    //console.log(`Submitted issue: ${issue}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Issue</Text>
      <TouchableOpacity style={styles.button} onPress={() => submitIssue('Incorrect Location')}>
        <Text style={styles.buttonText}>Incorrect Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => submitIssue('Incorrect Website')}>
        <Text style={styles.buttonText}>Incorrect Website</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => submitIssue('Incorrect Phone Number')}>
        <Text style={styles.buttonText}>Incorrect Phone Number</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => submitIssue('Incorrect Hours')}>
        <Text style={styles.buttonText}>Incorrect Hours</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
