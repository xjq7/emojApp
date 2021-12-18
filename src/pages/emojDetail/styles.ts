import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';
import themeMap from '@utils/themeMap';

interface Style {
  image_wrap: ViewStyle;
  item_image: ImageStyle;
  logo: ImageStyle;
  header: ViewStyle;
  header_btn_wrap: ViewStyle;
  data_wrap: ViewStyle;
  data_label: TextStyle;
  like_wrap: ViewStyle;
  item: ViewStyle;
  download_wrap: ViewStyle;
}

const style: Style = {
  image_wrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginLeft: 8,
    marginTop: 20,
    borderColor: themeMap.$Divider,
    borderWidth: 1,
    borderRadius: 10,
  },

  item_image: {
    height: 232,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  logo: {
    width: 380,
    height: 380,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: themeMap.$Divider,
  },
  header: {
    width: '100%',
    paddingHorizontal: 10,
    height: 420,
    borderTopWidth: 1,
    borderTopColor: themeMap.$Divider,
    // backgroundColor: 'red',
  },
  header_btn_wrap: {
    flex: 1,
    height: '100%',
  },
  data_label: {
    color: themeMap.$BlackM,
    fontSize: 26,
    marginLeft: 8,
    marginBottom: 2,
  },
  data_wrap: {
    width: 236,
    height: 60,
    backgroundColor: themeMap.$White,
    borderTopColor: themeMap.$Divider,
    borderTopWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  like_wrap: {
    marginLeft: 40,
  },

  download_wrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: themeMap.$Primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
