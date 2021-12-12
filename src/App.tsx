import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import Toast from 'react-native-toast-message';
import Stack from './navigation/Stack';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <Toast position="top" bottomOffset={20} />
    </>
  );
}
