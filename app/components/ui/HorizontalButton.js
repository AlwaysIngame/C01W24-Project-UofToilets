import { StyleSheet, Dimensions, View, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';

function HorizontalButton({ title, onPress }){

  //Render component
  return (
    <View>
        <TouchableOpacity style={styles.HBtn}
                            onPress={onPress}>
            <Text style={styles.buttonFont}>{title}</Text>
        <AntDesign name="right" size={20} color="#cccccc" style={styles.HBtnIcon}/>
        </TouchableOpacity>
    </View>
  );
};

export default HorizontalButton;