import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMapStyle from '@utils/themeMapStyle';

interface Style {
  input: ViewStyle;
  input_textInput: TextStyle;
}

const style: Style = {
  input: {
    width: 600,
    height: 100,
    borderBottomWidth: 1,
    borderColor: themeMapStyle.$Divider,
    marginHorizontal: 'auto',
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input_textInput: {
    fontSize: 28,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
