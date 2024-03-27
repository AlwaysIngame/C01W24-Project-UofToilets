import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const ProfileScreen = ({ navigation }) => {

  //State variables
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [condition, setCondition] = useState(undefined);

  //Functions
  useEffect(() => {
    async function getEverything() {
      try {
        const fn = await AsyncStorage.getItem('User-First-Name')
        const ln = await AsyncStorage.getItem('User-Last-Name')
        const c = await AsyncStorage.getItem('User-Condition')
        setFirstName(fn)
        setLastName(ln)
        setCondition(c)
      } catch (e) {
        console.log("Issue reading condition");
        setFirstName("")
        setLastName("")
        setCondition("")
      }
    }

    getEverything()
  }, []);

  function cancelChanges(){
    navigation.goBack();
  };

  async function saveChanges(){
    try {
      await AsyncStorage.setItem('User-First-Name', firstName);
    } catch (e) {
      console.log("Couldn't save first name");
    }

    try {
      await AsyncStorage.setItem('User-Last-Name', lastName);
    } catch (e) {
      console.log("Couldn't save last name");
    }

    try {
      await AsyncStorage.setItem('User-Condition', condition);
    } catch (e) {
      console.log("Couldn't save condition");
    }

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

      <View>
        <TouchableOpacity style={{
                          marginTop: 3*vw,
                          marginLeft: 2.5*vw,
                          width: '95%',
                          padding: 15,
                          backgroundColor: '#000000',
                          borderRadius: 5,
                          fontWeight: 'bold',}} 
                          onPress={saveChanges}>
          <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 16}}>Save</Text>
        </TouchableOpacity>
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

export default ProfileScreen;