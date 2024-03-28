import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles';

function UIButton({ title, onPress, emphasis, width, height, stretch }){

  //Render component
  return (
    <TouchableOpacity onPress={onPress} style={[emphasis ? styles.UIBtnEmph : styles.UIBtn,
      height ? {height: height} : null,
      width ? {width: width} : null,
      stretch ? {flex: 1} : null]}>
      <View >
              <Text style={emphasis ? styles.UIBtnTextEmph : styles.UIBtnText}>{title}</Text>
          {/* <AntDesign name="right" size={20} color="#cccccc" style={styles.iconStyle}/> */}
      </View>
    </TouchableOpacity>
  );
};

export default UIButton;