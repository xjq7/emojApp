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
  const [load, setLoad] = useState(true);

  const goNextPage = async () => {
    navigation.reset({index: 0, routes: [{name: 'home' as never}]});
  };

  const hideSplash = () => {
    // SplashScreen.hide();
  };

  const initRequest = useCallback(async () => {
    goNextPage();
    hideSplash();
  }, [goNextPage, hideSplash]);

  useEffect(() => {
    storage
      .getItem('token')
      .then(res => {
        console.log(res);
        if (!res) {
          return res;
        }
        setTokenObj(JSON.parse(res));
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    if (load) {
      return;
    }
    const current = Date.now();
    const {token, expires = 0} = tokenObj || {};
    if (!token || current > expires) {
      navigation.reset({index: 0, routes: [{name: 'login' as never}]});
    } else {
      initRequest();
    }
  }, [tokenObj, navigation, initRequest, setTokenObj, load]);

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
