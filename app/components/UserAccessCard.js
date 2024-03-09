//Import statements
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

//Component Functions and Constructor
const UserAccessCard = () => {
  return (
      <View style={styles.cardBody}>
        <View style={styles.cardIcon}>
          <Image style={styles.iconImage} source={require('../assets/CCC-GOHERE-CS5-1.jpg')}/>
        </View> 
        <View style={styles.cardText}>
          <Text style={styles.washroom}>Washroom</Text>
          <Text style={styles.accessCard}>Access Card</Text>
          <Text style={styles.helpText}>Please help. I require urgent access to a washroom.</Text>
        </View>
      </View>
  )
}

//Stylesheets
const styles = StyleSheet.create({
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    width: 88*vw,
    maxWidth: 1035,
    maxHeight: 540,
    height: 46*vw,
    borderRadius: 10,
    elevation: 3,
  },
  cardIcon: {
    width: '30%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  cardText: {
    width: '70%',
    height: '100%',
    backgroundColor: '#ec5255',
  },
  iconImage: {
    height: '80%',
    maxWidth: '100%',
    margin: 'auto',
  },
  washroom: {
    marginTop: 3*vw,
    marginLeft: 4*vw,
    marginBottom: 0*vw,
    fontSize: 4*vw,
    color: '#ffffff'
  },
  accessCard: {
    marginLeft: 4*vw,
    fontSize: 5*vw,
    color: '#ffffff',
    fontWeight: 'bold',
  }, 
  helpText: {
    marginLeft: 4*vw,
    fontSize: 3*vw,
    color: '#ffffff',
    position: 'absolute',
    bottom: 0,
    marginBottom: 8*vw,
  },
});

//Export Component
export default UserAccessCard;