import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Dimensions, Linking } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import UserAccessCard from './UserAccessCard';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const CardMenu = () => {
  //Snap point constants
  const snapPoints = (['25%', '60%']);
  
  //TODO: Update function to get disease from database
  const DName = () => (
    <Text style={styles.diseaseName}>Ulcerative Colitis</Text>
  );
  
  //TODO: Update function to get description from the database
  const DDesc = () => (
    <Text style={styles.diseaseDesc}>I live with colitis, a medical condition requiring urgent use of the washroom. Thank you for your understanding and cooperation.</Text>
  );

  function openCrohnsLink() {
      Linking.openURL('https://crohnsandcolitis.ca/About-Us').catch(err => console.error("Couldn't load page", err));
  };

  function openGoHereLink() {
    Linking.openURL('https://crohnsandcolitis.ca/gohere').catch(err => console.error("Couldn't load page", err));
};

  const MenuRender = gestureHandlerRootHOC(() => (
    <View style={styles.container}> 
      <Text style={{color: '#ec5255',
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginTop: 4*vh,
                    marginBottom: 2*vh,}}>
                      Access Card</Text>
      <UserAccessCard/>
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        style={styles.sheetShadow}
      >
        <View>
          <DName/>
          <DDesc/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.crohnsButtonStyle} onPress={openCrohnsLink}>
              <Text style={{textAlign: 'center', color: '#000000', fontSize: 16}}>CROHN'S AND COLITIS CANADA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goHereButtonStyle} onPress={openGoHereLink}>
            <Text style={{textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16}}>GoHere Washroom Access Program</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
    ) 
  );

  // renders
  return (
      <MenuRender/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  diseaseName: {
    marginTop: 2*vh,
    marginLeft: 4*vw, 
    fontSize: 6*vw, 
    fontWeight: 'bold',
  },
  diseaseDesc: {
    marginTop: 3*vh,
    marginLeft: 4*vw,
    marginRight: 3*vw,
    fontSize: 3.7*vw,
    lineHeight: 32,
  },
  sheetShadow: {
    backgroundColor: 'rgba(255, 255, 255,0)',  // <==== HERE
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  crohnsButtonStyle: {
    marginLeft: 2.5*vw,
    width: '95%',
    padding: 10,
    backgroundColor: '#efefef',
    borderRadius: 5,
  },
  goHereButtonStyle: {
    marginTop: 3*vw,
    marginLeft: 2.5*vw,
    width: '95%',
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20*vw,
    width: '100%',
  },
  buttonTextStyle: {
    textAlign: 'center'
  }
});

export default CardMenu;