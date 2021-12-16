import React from 'react';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Stack from './navigation/Stack';
import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <RecoilNexus />
        <Stack />
        <Toast position="top" bottomOffset={20} />
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
