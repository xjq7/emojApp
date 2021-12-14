import {StyleSheet, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';

interface Style {
  container: ViewStyle;
}

const style: Style = {
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
