import { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

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

  //Render
  return(
    <View style={{flex: 1, padding: 24, backgroundColor: 'white',}}>
      <View style={{borderBottomColor: '#cccccc', 
                    borderBottomWidth: 1 }}>
        <Text style={{fontSize: 13}}>First Name</Text>
        <TextInput style={{fontSize: 16}}
                   value={firstName}
                   placeholder='Enter first name'
                   onChangeText={setFirstName}/>
      </View>

      <View style={{borderBottomColor: '#cccccc', 
                    borderBottomWidth: 1, }}>
        <Text style={{fontSize: 13}}>Last Name</Text>
        <TextInput style={{fontSize: 16}}
                   value={lastName}
                   placeholder='Enter last name'
                   onChangeText={setLastName}/>
      </View>

      <View style={{borderBottomColor: '#cccccc', 
                    borderBottomWidth: 1, }}>
      <Text style={{fontSize: 13}}>Health Condition</Text>
      <TouchableOpacity style={{flexDirection: 'row',
                                marginVertical: 8}}>
          <Text style={{fontSize: 16}}>{condition}</Text>
          <AntDesign name="down" size={20} color="#cccccc" style={{position: 'absolute', right: 0, bottom: 0 }}/>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingRight: 12,
    paddingTop: 34,
    backgroundColor: 'white',
  },
});

export default ProfileScreen;