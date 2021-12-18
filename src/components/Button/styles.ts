import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  textM: TextStyle;
  textL: TextStyle;
  textS: TextStyle;
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
    color: themeMap.$White,
  },
  textOutline: {
    color: themeMap.$BlackS,
  },
  textDisable: {
    color: themeMap.$White,
  },
  textL: {
    fontSize: 36,
  },
  textM: {
    fontSize: 32,
  },
  textS: {
    fontSize: 28,
  },
  button: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44,
    paddingHorizontal: 32,
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
