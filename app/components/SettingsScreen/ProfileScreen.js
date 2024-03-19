import { StyleSheet, Dimensions, View, Text } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const ProfileScreen = () => {
  //Functions
  

  //Render
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the profile page</Text>
    </View>
  );
};

export default ProfileScreen;