import {StyleSheet, TextStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  input: TextStyle;
}

const style: Style = {
  input: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    backgroundColor: themeMap.$White,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
