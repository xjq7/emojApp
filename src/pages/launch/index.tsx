import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isAndroid} from '@utils/platform';

function Index() {
  const navigation = useNavigation();

  const initRequest = async () => {
    goNextPage();
    hideSplash();
  };

  const goNextPage = async () => {
    navigation.navigate({name: 'login'} as never);
    return;
    navigation.reset({index: 0, routes: [{name: 'home' as never}]});
  };

  const hideSplash = () => {
    // SplashScreen.hide();
  };

  useEffect(() => {
    if (isAndroid) {
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    }
    initRequest();
  }, []);

  return null;
}
export default Index;
