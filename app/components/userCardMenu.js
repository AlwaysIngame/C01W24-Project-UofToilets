import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const CardMenu = () => {
  const snapPoints = useMemo(() => ['50%'], []);

  const MenuRender = gestureHandlerRootHOC(() => (
    <View style={styles.container}> 
      <BottomSheet
        index={1}
        snapPoints={['25%', '50%']}
        style={styles.sheetShadow}
      >
        <View>
          <Text style={styles.diseaseName}>Ulcerative Colitis</Text>
          <Text style={styles.diseaseDesc}>I live with colitis, a medical condition requiring urgent use of the washroom. Thank you for your understanding and cooperation.</Text>
        </View>
        <View style={styles.infoButton}>
          <Button title="CROHN'S AND COLITIS CANDADA" color="#efefef">=</Button>
        </View>
        <View style={styles.goHereButton}>
          <Button title="GoHere Washroom Access Program" color="#000000"></Button>
        </View>
      </BottomSheet>
    </View>
    ) 
  );

  // renders
  return (
    <Modal>
      <MenuRender/>
    </Modal>
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
    marginLeft: 3*vw,
    fontSize: 6*vw, 
    fontWeight: 'bold',
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
  },
  sheetShadow: {
    backgroundColor: 'white',  // <==== HERE
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
});

export default CardMenu;