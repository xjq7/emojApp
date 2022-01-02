import React, {useEffect, useCallback} from 'react';
import {
  GetEmojBody,
  getEmojList,
  GetEmojBodyType,
  EmojDetail,
} from '@services/emoj';
import {Loading} from '@components/index';
import FlatList from '@components/FlatList';
import useInfinityList from '@hooks/useInfinityList';
import {navigate} from '@navigation/utils';
import {EmojItem} from '@pages/emojDetail';

function EmojList(props: {type?: GetEmojBodyType; name?: string}) {
  const {type, name = ''} = props;

  const fetchList = useCallback(
    o => {
      const body: GetEmojBody = {
        ...o.body,
      };
      if (type) {
        body.type = type;
      }
      if (name) {
        body.name = name;
      }
      return getEmojList(body).then(res => {
        const {data} = res;
        const {list: dataList = []} = data || {};
        return dataList;
      });
    },
    [type, name],
  );

  const [
    array,
    isEnd,
    isRefresh,
    isLoadMore,
    onEndReached,
    onRefresh,
    onRefreshForce,
  ] = useInfinityList(fetchList, {pageSize: 30});

  useEffect(() => {
    onRefreshForce(1);
  }, [name]);

  const renderItem = ({item}: {item: EmojDetail}) => {
    return (
      <EmojItem
        item={item}
        onPress={() => {
          navigate('emojDetail', {id: item.id});
        }}
      />
    );
  };

  if (!array) {
    return <Loading />;
  }

  return (
    <FlatList
      data={Array.isArray(array) ? array : []}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      numColumns={3}
      horizontal={false}
      refreshing={isRefresh}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      isEnd={isEnd}
    />
  );
}

export default EmojList;
