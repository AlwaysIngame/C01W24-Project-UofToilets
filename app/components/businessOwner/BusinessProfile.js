import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

export const BusinessProfile = ({ navigation }) => {
  //Functions
  const [firstName, setFirstName] = useState(() => {
    //Call database for first name, "" if bad response
    return "";
  });

  const [lastName, setLastName] = useState(() => {
    //Call database for last name, "" if bad response
    return "";
  });

  const [condition, setCondition] = useState(() => {
    //Call database for disease, "Ulcerative Colitis" if bad response
    return "Ulcerative Colitis";
  });

  function cancelChanges(){
    navigation.goBack();
  };

  function saveChanges(){
    //return back to the previous navigation and save changes
    console.log("Saving changes needs to be implemented")

    navigation.goBack();
  };

  function openSheet(){
    bottomSheetRef.current.expand();
  };

  function closeSheet(){
    bottomSheetRef.current.close();
  };

  const bottomSheetRef = useRef();

  const renderBackdrop = useCallback((props) => 
    <BottomSheetBackdrop {...props} style={{backgroundColor: 'grey', position: 'absolute', width: 100*vw, height: 100*vh}} appearsOnIndex={0} disappearsOnIndex={-1}/>
  );

  //Render
  return(
    <View style={{flex: 1, padding: 24, backgroundColor: 'white',}}>
      <View>
        <TouchableOpacity style={{
                          marginTop: 3*vw,
                          marginLeft: 2.5*vw,
                          width: '95%',
                          padding: 15,
                          backgroundColor: '#efefef',
                          borderRadius: 5,
                          fontWeight: 'bold',}}
                          onPress={cancelChanges}>
          <Text style={{textAlign: 'center', color: '#000000', fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['18%']}
        style={styles.sheetShadow}
        backdropComponent={renderBackdrop}>
        <BottomSheetView>
          <TouchableOpacity onPress={() => {setCondition("Crohn's Disease"); closeSheet();}}
                            style={{padding: 12, marginLeft: 12}}>
            <Text style={{fontSize: 16}}>Crohn's Disease</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setCondition("Ulcerative Colitis"); closeSheet();}}
                            style={{padding: 12, marginLeft: 12}}>
            <Text style={{fontSize: 16}}>Ulcerative Colitis</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
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
});