import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  container: ViewStyle;
  label: TextStyle;
}

const style: Style = {
  container: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    backgroundColor: themeMap.$White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: themeMap.$BlackS,
    fontSize: 28,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
