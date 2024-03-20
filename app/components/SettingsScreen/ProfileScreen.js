import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const ProfileScreen = () => {
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
    //Call database for disease, "Crohn's Disease" if bad response
    return "Crohn's Disease";
  })

  function cancelChanges(){
    //return back to the previous navigation without saving anything
  }

  function saveChanges(){
    //return back to the previous navigation and save changes
  }

  function openSheet(){
    bottomSheetRef.current.expand()
  }

  function closeSheet(){
    bottomSheetRef.current.collapse()
  }

  const bottomSheetRef = useRef();

  const renderBackdrop = useCallback((props) => 
    <BottomSheetBackdrop {...props} style={{backgroundColor: 'grey', position: 'absolute', width: 100*vw, height: 100*vh}} appearsOnIndex={0} disappearsOnIndex={-1}/>
  );

  //Render
  return(
    <View style={{flex: 1, padding: 24, backgroundColor: 'white',}}>
      <View style={{borderBottomColor: '#cccccc', 
                    borderBottomWidth: 1,
                    marginBottom: 2*vh}}>
        <Text style={{fontSize: 13, marginBottom: 1*vh}}>First Name</Text>
        <TextInput style={{fontSize: 16}}
                   value={firstName}
                   selectionColor='black'
                   placeholder='Enter first name'
                   onChangeText={setFirstName}/>
      </View>

      <View style={{borderBottomColor: '#cccccc', 
                    borderBottomWidth: 1,
                    marginBottom: 2*vh }}>
        <Text style={{fontSize: 13, marginBottom: 1*vh}}>Last Name</Text>
        <TextInput style={{fontSize: 16}}
                   value={lastName}
                   selectionColor='black'
                   placeholder='Enter last name'
                   onChangeText={setLastName}/>
      </View>

      <View style={{borderBottomColor: '#cccccc', 
                    borderBottomWidth: 1,
                    marginBottom: 2*vh}}>
      <Text style={{fontSize: 13, marginBottom: 1*vh}}>Health Condition</Text>
      <TouchableOpacity style={{flexDirection: 'row',
                                marginVertical: 8}}
                        onPress={openSheet}>
          <Text style={{fontSize: 16}}>{condition}</Text>
          <AntDesign name="down" size={20} color="#cccccc" style={{position: 'absolute', right: 0, bottom: 0 }}/>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        style={styles.sheetShadow}
        backdropComponent={renderBackdrop}>
        <BottomSheetView>
          <Text>Awesome 🎉</Text>
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

export default ProfileScreen;