import {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isAndroid} from '@utils/platform';
import {tokenAtom} from '@atom/user';
import {useRecoilState} from 'recoil';
import storage from '@lib/storage';

function Index() {
  const navigation = useNavigation();
  const [tokenObj, setTokenObj] = useRecoilState(tokenAtom);

  const goNextPage = async () => {
    navigation.reset({index: 0, routes: [{name: 'home' as never}]});
  };

  const hideSplash = () => {
    // SplashScreen.hide();
  };

  const initRequest = useCallback(async () => {
    const res = await storage.getItem('token');
    if (res) {
      setTokenObj(JSON.parse(res));
    }
    goNextPage();
    hideSplash();
  }, [goNextPage, hideSplash]);

  useEffect(() => {
    initRequest();
  }, [initRequest]);

  useEffect(() => {
    if (isAndroid) {
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  return null;
}
export default Index;
