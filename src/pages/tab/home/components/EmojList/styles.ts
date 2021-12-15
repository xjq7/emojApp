import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';

interface Style {
  item: ViewStyle;
  image: ImageStyle;
}

const style: Style = {
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 236,
    height: 236,
    marginLeft: 10,
    marginTop: 20,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
