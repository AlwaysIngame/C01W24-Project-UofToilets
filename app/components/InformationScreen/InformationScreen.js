import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, Linking } from 'react-native';
import SponsorCarousel from './SponsorCarousel';
import InfoBlurb from './InformationText';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const InformationScreen = () => {

  const snapPoints = (['40%', '90%']);

  function openDonationLink() {
    Linking.openURL('https://crohnsandcolitis.donorportal.ca/Donation/Donation.aspx').catch(err => console.error("Couldn't load page", err));
};

  const MenuRender = gestureHandlerRootHOC(() => (
    <View style={styles.container}> 
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        style={styles.sheetShadow}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.ButtonStyle} onPress={openDonationLink}>
              <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>Donate</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 24, marginBottom: 1.5*vh, marginTop: 4*vh, fontWeight: 'bold', fontSize: 22}}>Support</Text>
          <Text style={{marginLeft: 24, fontSize: 3.7*vw, lineHeight: 32,}}>Make a donation to support the GoHere program.</Text>
        </View>
      </BottomSheet>
    </View>
    ) 
  );

  return(
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1, marginTop: 6*vh,}}>
        <InfoBlurb/>
        <Text style={{marginLeft: 24, marginBottom: 2*vh, marginTop: 4*vh, fontWeight: 'bold', fontSize: 22}}>Our Partners</Text>
        <SponsorCarousel/>
        <MenuRender/>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
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
  ButtonStyle: {
    marginTop: 1*vh,
    marginLeft: 2.5*vw,
    width: '95%',
    padding: 15,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
});

export default InformationScreen;