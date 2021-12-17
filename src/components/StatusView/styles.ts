import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  content: ViewStyle;
  color: TextStyle;
}

const style: Style = {
  content: {
    alignItems: 'center',
    flex: 1,
    minHeight: 400,
    marginTop: 200,
  },
  color: {
    color: themeMap.$BlackL,
    fontSize: 28,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
