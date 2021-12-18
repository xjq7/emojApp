import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  btn: ViewStyle;
  close: ViewStyle;
}

const style: Style = {
  container: {
    width: 600,
    height: 700,
    backgroundColor: themeMap.$White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  image: {
    width: 420,
    height: 420,
    marginLeft: 10,
    marginTop: 10,
  },
  btn: {
    width: 180,
  },
  close: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: 10,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
