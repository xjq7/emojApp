import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  btn: ViewStyle;
  btnLabel: TextStyle;
}

const style: Style = {
  container: {
    width: 400,
    height: 400,
    backgroundColor: themeMap.$White,
    alignItems: 'center',
  },
  image: {
    width: 236,
    height: 236,
    marginLeft: 10,
    marginTop: 20,
  },
  btn: {
    width: 180,
    height: 60,
    backgroundColor: themeMap.$White,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: themeMap.$Divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnLabel: {
    fontSize: 12,
    color: themeMap.$BlackS,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
