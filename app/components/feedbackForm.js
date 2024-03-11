import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const FeedbackForm = ({ companyName }) => {
  const [feedback, setFeedback] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));

  const submitFeedback = async () => {
    try {
      const response = await fetch('https://example.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: companyName,
          feedback: feedback,
        }),
      });
      
      const data = await response.json();
      console.log('Feedback submitted:', data);
      setFeedback('');
      Keyboard.dismiss();
      Animated.sequence([
        Animated.timing(buttonAnimation, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.companyName}>{companyName} Feedback</Text>
        <TextInput
          style={[styles.input, { height: 150 }]}
          multiline={true}
          placeholder="Type your feedback here..."
          value={feedback}
          onChangeText={text => setFeedback(text)}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitFeedback}
          activeOpacity={0.8}
        >
          <Animated.Text
            style={[styles.buttonText, { transform: [{ scale: buttonAnimation }] }]}
          >
            Submit Feedback
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeedbackForm;
