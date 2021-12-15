import React from 'react';
import {ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';

interface Props extends ViewProps {}

export default function Container(props: Props) {
  const {children} = props;

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
