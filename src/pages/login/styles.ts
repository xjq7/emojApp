import {StyleSheet, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';

interface Style {
  container: ViewStyle;
}

const style: Style = {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
