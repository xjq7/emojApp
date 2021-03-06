import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  input: ViewStyle;
  input_textInput: TextStyle;
}

const style: Style = {
  input: {
    width: 600,
    height: 100,
    borderBottomWidth: 1,
    borderColor: themeMap.$Divider,
    marginHorizontal: 'auto',
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 20,
  },
  input_textInput: {
    width: '100%',
    fontSize: 28,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
