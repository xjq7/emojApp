import {StyleSheet, ViewStyle} from 'react-native';
import scaleStyle from '@utils/scaleStyle';

interface Style {
  flexRow: ViewStyle;
  flexCol: ViewStyle;
  row_start: ViewStyle;
  row_center: ViewStyle;
  row_end: ViewStyle;
  row_around: ViewStyle;
  row_between: ViewStyle;
  col_start: ViewStyle;
  col_center: ViewStyle;
  col_end: ViewStyle;
}

const style: Style = {
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  row_start: {
    justifyContent: 'flex-start',
  },
  row_center: {
    justifyContent: 'center',
  },
  row_end: {
    justifyContent: 'flex-end',
  },
  row_around: {
    justifyContent: 'space-around',
  },
  row_between: {
    justifyContent: 'space-between',
  },
  col_start: {
    alignItems: 'flex-start',
  },
  col_center: {
    alignItems: 'center',
  },
  col_end: {
    alignItems: 'flex-end',
  },
};

export default StyleSheet.create<Style>(scaleStyle(style));
