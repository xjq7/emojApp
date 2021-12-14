import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';

type Style = Record<string, TextStyle | ViewStyle | ImageStyle>;

const style: Style = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
