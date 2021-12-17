import React, {useState} from 'react';
import InputItem from './components/InputItem';
import {Button, Container, Divider, Toast} from '@components/index';
import themeMap from '@utils/themeMap';
import {login} from '@services/auth';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/Stack';
import {useSetRecoilState} from 'recoil';
import {tokenAtom, userInfoAtom} from '@atom/user';
import storage from '@lib/storage';

export default function Login({
  navigation,
}: StackScreenProps<RootStackParamList, 'login'>) {
  const setToken = useSetRecoilState(tokenAtom);
  const setUserinfo = useSetRecoilState(userInfoAtom);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log(account, password);

    if (!account || !password) {
      Toast.show({type: 'error', text1: '账号或密码不能为空!'});
      return;
    }
    setLoading(true);
    try {
      const result: any = await login({phone: account, password});
      if (result.code) {
        Toast.show({type: 'error', text1: result.messag});
      } else {
        const {data} = result;
        const {token, expireDays, ...userInfo} = data || {};
        const expires = Date.now() + expireDays * 24 * 60 * 60 * 1000;
        storage.setItem('token', {token, expires});
        setToken({token, expires});
        setUserinfo(userInfo);
        Toast.show({type: 'success', text1: '登录成功!'});
        navigation.reset({index: 0, routes: [{name: 'home'}]});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <InputItem
        value={account}
        onChangeText={(text: string) => {
          setAccount(text);
        }}
        placeholder="请输入账号"
      />
      <Divider height={30} />
      <InputItem
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
        }}
        placeholder="请输入密码"
        secureTextEntry
      />
      <Divider height={30} />
      <Button
        title="登录/注册"
        loading={loading}
        textStyle={{color: themeMap.$White}}
        onPress={handleLogin}
      />
    </Container>
  );
}
