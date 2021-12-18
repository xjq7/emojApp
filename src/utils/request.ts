import Axios from 'axios';
import {Toast} from '@components/index';
import Config from '../config/config';
import {getRecoil, setRecoil} from 'recoil-nexus';
import {tokenAtom} from '@atom/user';
import {navigationRef} from '@navigation/utils';
import storage from '@lib/storage';
console.log(Config);

const instance = Axios.create({
  baseURL: 'http://192.168.1.106:39001/v1/c',
  // baseURL: Config.API_URL + '/v1/c',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const newConfig = {...config};
    const {token = ''} = getRecoil(tokenAtom) || {};
    newConfig.headers.Authorization = 'Bearer ' + token;
    return newConfig;
  },
  err => Promise.reject(err),
);

instance.interceptors.response.use(
  response => {
    const {data} = response;
    const {code, message} = data || {};

    if (code !== 0) {
      Toast.show({type: 'error', text1: message});
      return Promise.reject(data);
    }
    return data;
  },
  err => {
    const {response, message} = err;
    const {status} = response || {};
    if (status === 401) {
      if (navigationRef.getCurrentRoute()?.name !== 'login') {
        setRecoil(tokenAtom, {});
        storage.removeItem('token');
        Toast.show({type: 'error', text1: '登录失效，请重新登录'});
        navigationRef.reset({index: 0, routes: [{name: 'login' as never}]});
      }
    } else {
      Toast.show({
        type: 'error',
        text1: '请求失败',
        text2: message,
      });
    }
    return Promise.reject(err);
  },
);

export default instance;
