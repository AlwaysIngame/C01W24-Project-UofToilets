import { StyleSheet, Dimensions, View, Text } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const InfoBlurb = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About GoHere</Text>
      <Text style={styles.body}>Crohn's and Colitis Canada's GoHere program helps create understanding, supportive and accessible communities by improving washroom access.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    color: '#ec5255',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 4*vw,
    fontSize: 3.7*vw,
    lineHeight: 32,
  },
});

export default InfoBlurb;