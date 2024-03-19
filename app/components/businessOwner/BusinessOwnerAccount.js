import { StyleSheet, Dimensions, View, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

function BusinessOwnerAccount(props) {

    const logoutAction = () => {
        AsyncStorage.setItem("session_token", null);
        AsyncStorage.setItem("logged_in", "false");
        props.navigation.replace("Welcome");
    }

  //Render component
  return (
    <View>
        <View>
            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 3*vh,}}
                            onPress={() => props.navigation.navigate("Settings")}>
            <Text>Settings</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 3*vh,}}
                            onPress={logoutAction}>
            <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default BusinessOwnerAccount;