import * as React from 'react';
import {Button, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Container from '@components/Container';
import styles from './index.scss';
import {Toast} from '@components/index';

export default function HomeScreen({navigation}: StackScreenProps) {
  return (
    <Container centerComponent={{text: 'aa'}}>
      <Button
        title="Go to Settings"
        onPress={() => {
          Toast.show({type: 'success', text1: '123'});
          // navigation.navigate('Setting');
        }}
      />
      <Text style={styles.a}>Home!</Text>
    </Container>
  );
}
