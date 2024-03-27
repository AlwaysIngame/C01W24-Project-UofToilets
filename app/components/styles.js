import { StyleSheet, Dimensions, View, Text } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const COLOR_PRIMARY = '#ec5255';
const COLOR_SECONDARY = '#dddddd';
const BORDER_COLOR = '#cccccc';

export const styles = StyleSheet.create({

  UIBtn: {
    width: 'auto',
    height: 72,
    padding: 12,
    flexDirection: 'collumn',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: COLOR_SECONDARY,
    borderRadius: 12,
  },

  UIBtnEmph: {
    width: 'auto',
    height: 72,
    padding: 12,
    flexDirection: 'collumn',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 12,
  },
  
  UIBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  UIBtnTextEmph: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },

  HBtn: {
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
  HBtnIcon: {
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
  