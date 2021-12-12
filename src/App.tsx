import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Stack from './navigation/Stack';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <Toast position="top" bottomOffset={20} />
    </SafeAreaProvider>
  );
}
