import Axios from 'axios';
import {Toast} from '@components/index';

const instance = Axios.create({
  baseURL: 'API' as string,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config: any) => {
    const newConfig = {...config};
    // const token = localStorage.getItem('token');
    // newConfig.headers.Authorization = `Bearer ${token}`;
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
    const {status} = err.response;
    if (status === 401) {
      Toast.show({type: 'error', text1: '登录失效，请重新登录'});
      setTimeout(() => {}, 1000);
    }
    return Promise.reject(err);
  },
);

export default instance;
