import { BottomSheet } from 'react-spring-bottom-sheet'
import { Button, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native'
import 'react-spring-bottom-sheet/dist/style.css'

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const CardForm = () => {
  return (
    <>
      <BottomSheet 
      open 
      skipInitialTransition 
      blocking={false}
      defaultSnap={({ maxHeight }) => maxHeight / 4}
      //These values can be changed according to page requirements
      snapPoints={({ maxHeight }) => [ 
        maxHeight / 1.5,
        maxHeight / 4,
      ]}
      expandOnContentDrag
      >
        <View>
          <Text style={styles.diseaseName}><b>Ulcerative Colitis</b></Text>
          <Text style={styles.diseaseDesc}>I live with colitis, a medical condition requiring urgent use of the washroom. Thank you for your understanding and cooperation.</Text>
        </View>
        <View style={styles.infoButton}>
          <Button title="CROHN'S AND COLITIS CANDADA" color="#efefef">=</Button>
        </View>
        <View style={styles.goHereButton}>
          <Button title="GoHere Washroom Access Program" color="#000000"></Button>
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  diseaseName: {
    marginTop: 2*vh,
    marginLeft: 3*vw,
    fontSize: 6*vw, 
  },
  diseaseDesc: {
    marginTop: 3*vh,
    marginLeft: 3*vw,
    marginRight: 3*vw,
    fontSize: 3.75*vw,
  },
  infoButton: {
    margin: 'auto',
    marginTop: 8*vh, //can adjust this to satisfy requirments.
    width: '90%',
  },
  goHereButton: {
    margin: 'auto',
    marginTop: 1*vh,
    width: '90%',
  }
});

export default CardForm;