import { StyleSheet, Dimensions, View, Text, StatusBar } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

// export const COLOR_PRIMARY = '#ec5255';
export const COLOR_PRIMARY = '#ec3838';
export const COLOR_SECONDARY = '#dddddd';
export const BORDER_COLOR = '#cccccc';

export const styles = StyleSheet.create({

  SUIBtn: {
    width: 'auto',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: COLOR_SECONDARY,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

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
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  UIBtnTextEmph: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },

  HBtn: {
    width: "100%",
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
  centeredScreenContainer: {
    marginTop: StatusBar.currentHeight,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    gap: 12,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sheetShadow: {
    backgroundColor: 'rgba(255, 255, 255,0)',  // <==== HERE
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  crohnsButtonStyle: {
    marginLeft: 2.5*vw,
    width: '95%',
    padding: 15,
    backgroundColor: '#efefef',
    borderRadius: 5,
  },
  goHereButtonStyle: {
    marginTop: 3*vw,
    marginLeft: 2.5*vw,
    width: '95%',
    padding: 15,
    backgroundColor: '#000000',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
  },
  buttonTextStyle: {
    textAlign: 'center'
  }
});
  