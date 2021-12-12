import React from 'react';
import {View} from 'react-native';
import {Header, HeaderProps} from 'react-native-elements';
import styles from './index.scss';

interface Props extends HeaderProps {}

export default function Container(props: Props) {
  const {children, leftComponent, rightComponent, centerComponent} = props;

  return (
    <View style={styles.container}>
      <Header
        leftComponent={leftComponent}
        centerComponent={centerComponent}
        rightComponent={rightComponent}
      />
      {children}
    </View>
  );
}
