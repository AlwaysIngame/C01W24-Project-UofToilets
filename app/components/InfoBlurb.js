import { StyleSheet, Dimensions, View, Text } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const InfoBlurb = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}><b>About GoHere</b></Text>
      <Text style={styles.body}>Crohn's and Colitis Canada's GoHere program helps create understanding, supportive and accessible communities by improving washroom access.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5*vw,
  },
  title: {
    color: '#ec5255',
    fontSize: 8*vw,
  },
  body: {
    marginTop: 4*vw,
    fontSize: 4*vw,
  },
});

export default InfoBlurb;