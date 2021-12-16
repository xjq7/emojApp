import React from 'react';
import {View, ViewProps} from 'react-native';
// import {Divider} from 'react-native-elements';
import scalePx from '@utils/scalePx';
interface Props extends ViewProps {
  height: number;
  color?: string;
}

function Component({height, color = 'transparent'}: Props) {
  return <View style={{height: scalePx(height), backgroundColor: color}} />;
}
export default Component;
