//Import statements
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

//Component Functions and Constructor
export default function UserAccessCard(props){
  const firstName = props.firstName;
  const lastName = props.lastName;
  const condition = props.condition;

  return (
      <View style={styles.cardBody}>
        <View style={styles.cardIcon}>
          <Image style={styles.iconImage} source={require('../assets/CCC-GOHERE-CS5-1.jpg')}/>
        </View> 
        <View style={styles.cardText}>
          <Text style={styles.washroom}>Washroom</Text>
          <Text style={styles.accessCard}>Access Card</Text>
          <Text style={styles.diseaseLabel}>{condition}</Text>
          <Text style={styles.nameLabel}>{firstName} {lastName}</Text>
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
    display: 'flex',
    justifyContent: 'center',
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
    paddingRight: 4*vw,
    fontSize: 3*vw,
    color: '#ffffff',
    position: 'absolute',
    bottom: 0,
    marginBottom: 5*vw,
  },
  diseaseLabel: {
    padding: 3,
    borderWidth: 1,
    width: 28*vw,
    color: 'white',
    borderColor: 'white',
    textAlign: 'center',
    borderRadius: 7,
    marginTop: 2.5*vw,
    marginLeft: 4*vw,
  },
  nameLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4*vw,
    marginTop: 2*vw,
  }
});
