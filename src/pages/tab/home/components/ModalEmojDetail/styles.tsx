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
    width: 500,
    height: 500,
    backgroundColor: themeMap.$White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  image: {
    width: 286,
    height: 286,
    marginLeft: 10,
    marginTop: 20,
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
