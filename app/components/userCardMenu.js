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
    fontSize: 3.75*vw,
  },
  cccInfoButton: {
    marginTop: 3*vh,
  }, 
  gohereButton: {
    marginTop: 3*vh,
  },
});

export default CardForm;