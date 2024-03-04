import { BottomSheet, SheetContent } from 'react-spring-bottom-sheet'
import { Button, StyleSheet, Text, View } from 'react-native';

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'

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
    marginTop: '2vh',
    marginLeft: '3vw',
    fontSize: '6vw',
  },
  diseaseDesc: {
    marginTop: '3vh',
    marginLeft: '3vw',
    fontSize: '3.75vw',
  },
  cccInfoButton: {
    marginTop: '3vh',
  }, 
  gohereButton: {
    marginTop: '3vh',
  },
});

export default CardForm;