import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles';

function CircleButton({ icon, onPress}){

  //Render component
  return (
    <TouchableOpacity onPress={onPress} style={styles.SUIBtn}>
      <View >
          {icon}
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;