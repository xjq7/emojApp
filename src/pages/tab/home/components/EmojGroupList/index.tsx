import React, {useCallback} from 'react';
import {View} from 'react-native';
import useInfinityList from '@hooks/useInfinityList';
import {GetEmojBody, getEmojGroupList} from '@services/emoj';
import FlatList from '@components/FlatList';
import styles from './styles';
import {Wrap, Text, Image, PressView} from '@components/index';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import scalePx from '@utils/scalePx';
import {navigate} from '@navigation/utils';

function EmojGroupList() {
  const fetchList = useCallback(o => {
    const body: GetEmojBody = {
      ...o.body,
    };

    return getEmojGroupList(body).then(res => {
      const {data} = res;
      const {list: dataList = []} = data || {};
      return dataList;
    });
  }, []);

  const [array, isEnd, isRefresh, isLoadMore, onEndReached, onRefresh] =
    useInfinityList(fetchList, {pageSize: 10});

  const renderItem = ({item}: any) => {
    const {emojs} = item;
    return (
      <PressView
        style={styles.item}
        onPress={() => {
          navigate('emojDetail', {id: emojs[0].id});
        }}>
        <Wrap row="between" style={styles.item_header}>
          <Text style={styles.item_header_title} numberOfLines={1}>
            {item.name}
          </Text>
          <AntDesignIcon name="right" size={scalePx(30)} />
        </Wrap>
        <Wrap row="around">
          {emojs.map((item: any) => {
            console.log(item);
            return (
              <Image
                resizeMode="contain"
                style={styles.image}
                url={item.url.replace('https://', 'http://')}
              />
            );
          })}
        </Wrap>
      </PressView>
    );
  };

  return (
    <FlatList
      data={Array.isArray(array) ? array : []}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      horizontal={false}
      refreshing={isRefresh}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      isEnd={isEnd}
    />
  );
}
export default EmojGroupList;
