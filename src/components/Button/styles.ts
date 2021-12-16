import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  text: TextStyle;
  textSolid: TextStyle;
  textOutline: TextStyle;
  textDisable: TextStyle;
  button: ViewStyle;
  buttonSolid: ViewStyle;
  buttonOutline: ViewStyle;
  buttonDisable: ViewStyle;
}

const style: Style = {
  textSolid: {
    color: themeMap.$BlackS,
  },
  textOutline: {
    color: themeMap.$BlackS,
  },
  textDisable: {
    color: themeMap.$White,
  },
  text: {
    fontSize: 32,
  },
  button: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 44,
    paddingHorizontal: 44,
    paddingVertical: 0,
  },
  buttonSolid: {
    backgroundColor: themeMap.$Primary,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#ebebeb',
  },
  buttonDisable: {
    backgroundColor: '#dadadf',
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
