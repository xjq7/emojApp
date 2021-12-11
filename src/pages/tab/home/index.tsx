import * as React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './index.scss';

export default function HomeScreen({navigation}: any) {
  return (
    <View>
      <Text style={styles.a}>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}
