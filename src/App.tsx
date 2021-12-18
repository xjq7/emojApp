import React from 'react';
import Toast from 'react-native-toast-message';
import Stack from './navigation/Stack';
import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';

export default function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <Stack />
      <Toast position="top" bottomOffset={20} />
    </RecoilRoot>
  );
}
