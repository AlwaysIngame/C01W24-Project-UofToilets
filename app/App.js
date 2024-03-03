import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserAccessCard from './components/UserAccessCard';

//<Text>Open up App.js to start working on your app!</Text>

export default function App() {
  return (
    <View style={styles.container}>
      <UserAccessCard/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
