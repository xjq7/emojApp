import React, {useMemo} from 'react';
import {ViewProps, View} from 'react-native';
import styles from './styles';

interface Props extends ViewProps {
  col?: 'center' | 'start' | 'end';
  row?: 'center' | 'between' | 'start' | 'end' | 'around';
  flex?: 'row' | 'col';
}

function Wrap(props: Props) {
  const {children, style, flex = 'row', row = 'start', col = 'center'} = props;

  const flexStyle = useMemo(() => {
    if (flex === 'row') {
      return styles.flexRow;
    }
    if (flex === 'col') {
      return styles.flexCol;
    }
  }, [flex]);

  const rowStyle = useMemo(() => {
    switch (row) {
      case 'center':
        return styles.row_center;
      case 'between':
        return styles.row_between;
      case 'start':
        return styles.row_start;
      case 'end':
        return styles.row_end;
      case 'around':
        return styles.row_around;
    }
  }, [row]);

  const colStyle = useMemo(() => {
    switch (col) {
      case 'center':
        return styles.col_center;
      case 'start':
        return styles.col_start;
      case 'end':
        return styles.col_end;
    }
  }, [col]);

  return <View style={[flexStyle, rowStyle, colStyle, style]}>{children}</View>;
}
export default Wrap;
