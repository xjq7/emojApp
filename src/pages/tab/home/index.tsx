import React, {useEffect, useState} from 'react';
import {Button, Image, FlatList, Text, View} from 'react-native';
import Container from '@components/Container';
import {getEmojList} from '@services/emoj';
import {Toast} from '@components/index';
import styles from './index.scss';

export default function HomeScreen({navigation}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getEmojList({page: 1, pageSize: 20}).then(res => {
      const {data} = res;
      console.log(res);

      setList(data?.list || []);
    });
  }, []);

  const renderItem = ({item}: any) => {
    const {url} = item;
    return (
      <View>
        <Image
          source={{
            uri: url.replace('https://', 'http://'),
          }}
          style={{width: 200, height: 200}}
          onError={e => {
            console.log(e);
          }}
        />
        <Text>bbbbb</Text>
      </View>
    );
  };

  return (
    <Container centerComponent={{text: 'aa'}}>
      <Button
        title="Go to Settings"
        onPress={() => {
          Toast.show({type: 'success', text1: '123'});
          // navigation.navigate('Setting');
        }}
      />
      <FlatList data={list} renderItem={renderItem} />
    </Container>
  );
}
