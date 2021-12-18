import {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isAndroid} from '@utils/platform';
import {tokenAtom, userInfoAtom} from '@atom/user';
import {useRecoilState} from 'recoil';
import storage from '@lib/storage';

function Index() {
  const navigation = useNavigation();
  const [, setTokenObj] = useRecoilState(tokenAtom);
  const [, setUserInfo] = useRecoilState(userInfoAtom);

  const goNextPage = async () => {
    navigation.reset({index: 0, routes: [{name: 'home' as never}]});
  };

  const hideSplash = () => {
    // SplashScreen.hide();
  };

  const initRequest = useCallback(async () => {
    const tokenObj = await storage.getItem('token');
    const userInfo = await storage.getItem('userInfo');
    if (tokenObj) {
      setTokenObj(JSON.parse(tokenObj));
    }
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
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
