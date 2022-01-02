import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  item: ViewStyle;
  item_header: ViewStyle;
  item_header_title: TextStyle;
  image: ViewStyle;
}

const style: Style = {
  item: {
    width: 690,
    paddingTop: 15,
    paddingBottom: 20,
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: themeMap.$Divider,
  },
  item_header: {
    width: '100%',
    height: 80,
  },
  item_header_title: {
    width: 600,
    fontSize: 30,
  },
  image: {
    width: 210,
    height: 210,
    backgroundColor: themeMap.$White,
    borderRadius: 10,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
