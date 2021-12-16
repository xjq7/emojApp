import React from 'react';
import {RootStackParamList} from '@navigation/Stack';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';

export default function SettingsScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'emoj'>) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        onPress={() => {
          navigation.navigate('login');
        }}>
        Emoj!
      </Text>
    </View>
  );
}
