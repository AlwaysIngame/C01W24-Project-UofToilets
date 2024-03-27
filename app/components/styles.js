import { StyleSheet, Dimensions, View, Text } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const COLOR_PRIMARY = '#ec5255';
const BORDER_COLOR = '#cccccc';

export const styles = StyleSheet.create({
  hbutton: {
    width: "100%",
    height: 'auto',
    padding: 12,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconStyle: {
    alignSelf: 'flex-end',
    right: 0,
  },
  title: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
    fontSize: 30,
  },
  sectionTitle: {
    padding: 12,
    marginRight: 0,
    color: COLOR_PRIMARY,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonFont: {
    fontSize: 16,
  },  
});
  