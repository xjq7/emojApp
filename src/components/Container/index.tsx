import React from 'react';
import {ViewProps, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';

interface Props extends ViewProps {
  hasHeader?: boolean;
}

export default function Container(props: Props) {
  const {children, hasHeader = false} = props;

  if (hasHeader) {
    return <View style={styles.container}>{children}</View>;
  }

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
