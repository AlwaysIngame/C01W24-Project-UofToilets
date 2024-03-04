//Import statements
import { StyleSheet, Text, View, Image } from 'react-native';

//Component Functions and Constructor
const UserAccessCard = () => {
  return (
    <View style={styles.cardBody}>
      <View style={styles.cardIcon}>
        <Image style={styles.iconImage} source={require('../assets/CCC-GOHERE-CS5-1.jpg')}/>
      </View> 
      <View style={styles.cardText}>
        <Text style={styles.washroom}>Washroom</Text>
        <Text style={styles.accessCard}><b>Access Card</b></Text>
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
    width: '88vw',
    maxWidth: '1035px',
    maxHeight: '540px',
    height: '46vw',
    backgroundColor: '#ffffff',
    borderRadius: '3vw',
    shadowOffset: {width: '-0.5vw', height: '0.5vw'},
    shadowRadius: '1vw',
    shadowOpacity: '0.3',
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
    marginTop: '3vw',
    marginLeft: '4vw',
    marginBottom: '0vw',
    fontSize: '4vw',
    color: '#ffffff'
  },
  accessCard: {
    marginLeft: '4vw',
    fontSize: "5vw",
    color: '#ffffff',
  }, 
  helpText: {
    marginLeft: '4vw',
    fontSize: "3vw",
    color: '#ffffff',
    position: 'absolute',
    bottom: '0px',
    marginBottom: '8vw',
  },
});

//Export Component
export default UserAccessCard;