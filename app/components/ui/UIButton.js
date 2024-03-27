import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles';

function UIButton({ title, onPress, emphasis, width, height }){

  //Render component
  return (
    <View>
        <TouchableOpacity style={[emphasis ? styles.UIBtnEmph : styles.UIBtn,
                                  height ? {height: height} : null,
                                  width ? {width: width} : null]} onPress={onPress} >
            <Text style={emphasis ? styles.UIBtnTextEmph : styles.UIBtnText}>{title}</Text>
        {/* <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/> */}
        </TouchableOpacity>
    </View>
  );
};

export default UIButton;