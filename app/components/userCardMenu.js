import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, Dimensions, Linking } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import UserAccessCard from './UserAccessCard';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, COLOR_PRIMARY } from './styles';
import UIButton from './ui/UIButton';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const CardMenu = () => {
  //Snap point constants
  const snapPoints = (['25%', '60%']);
  
  const isFocused = useIsFocused();
  
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
  }, [isFocused]);

  function openCrohnsLink() {
      Linking.openURL('https://crohnsandcolitis.ca/About-Us').catch(err => console.error("Couldn't load page", err));
  };

  function openGoHereLink() {
    Linking.openURL('https://crohnsandcolitis.ca/gohere').catch(err => console.error("Couldn't load page", err));
};

  const MenuRender = gestureHandlerRootHOC(() => (
    <View style={[styles.container, {padding: 12}]}> 
      <View style={[styles.container, {gap: 12}]}>
        {/* <Text style={styles.title}>Access Card</Text> */}
        <UserAccessCard firstName={firstName} lastName={lastName} condition={condition}/>
        <Text style={{fontSize: 16, padding: 8, textAlign: 'center'}}>I live with {condition}, a medical condition requiring urgent use of the washroom.</Text>
        <Text style={{fontSize: 16, textAlign: 'center'}}> Thank you for your understanding and cooperation.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <UIButton title="Crohn's and Colitis Canada" onPress={openCrohnsLink} height={50}/>
        <UIButton title="Gohere Washroom Program" onPress={openGoHereLink} height={50}/>
      </View>
      {/* <BottomSheet
        index={0}
        snapPoints={snapPoints}
        style={styles.sheetShadow}
      >
      </BottomSheet> */}
    </View>
    ) 
  );

  // renders
  return (
      <MenuRender/>
  );
};

export default CardMenu;