import React from 'react';
import {ViewProps, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import getStatusBarHeight from '@utils/getStatusBarHeight';
import styles from './styles';
import {isAndroid} from '@utils/platform';

interface Props extends ViewProps {
  headerHide?: boolean;
}

export default function Container(props: Props) {
  const {children, headerHide = false, style} = props;

  if (headerHide) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View
          style={{
            height: getStatusBarHeight(),
            backgroundColor: 'transparent',
          }}
        />
        <View style={[styles.container, style]}>{children}</View>
      </>
    );
  }

  return <View style={[styles.container, style]}>{children}</View>;
}
