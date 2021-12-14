import React from 'react';
import {View, ViewProps} from 'react-native';
import styles from './styles';

interface Props extends ViewProps {}

export default function Container(props: Props) {
  const {children} = props;

  return <View style={styles.container}>{children}</View>;
}
