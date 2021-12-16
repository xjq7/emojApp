import Axios from 'axios';
import {Toast} from '@components/index';
import Config from '../config/config';

const instance = Axios.create({
  baseURL: Config.API_URL + '/v1',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const newConfig = {...config};
    newConfig.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzkxNTk4MjIsImV4cCI6MTY0MTc1MTgyMn0.HVnWe88Ma4CBW6LVEicT8GHtCVPm2Pd7lJ66wpniepU';
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
    console.log(err);

    const {status} = err.response;
    if (status === 401) {
      Toast.show({type: 'error', text1: '登录失效，请重新登录'});
    } else {
      Toast.show({
        type: 'error',
        text1: '请求失败',
        text2: JSON.stringify(err),
      });
    }
    return Promise.reject(err);
  },
);

export default instance;
