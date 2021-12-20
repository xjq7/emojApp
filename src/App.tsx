import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import Stack from './navigation/Stack';
import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import * as WeChat from 'react-native-wechat-lib';

export default function App() {
  useEffect(() => {
    try {
      // WeChat.registerApp('wx281708d0be8cb88b', 'https://m.aifenglife.com/');
    } catch (error) {}
  }, []);
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
