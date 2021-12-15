import {StyleSheet, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  container: ViewStyle;
}

const style: Style = {
  container: {
    flex: 1,
    backgroundColor: themeMap.$PageBg,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
