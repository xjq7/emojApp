import React, {useState, useEffect, useRef} from 'react';
import {FlatList, View, Image} from 'react-native';
import {Emoj, getEmojList} from '@services/emoj';
import Loading from '@components/Loading';
import styles from './styles';

function EmojList() {
  const [list, setList] = useState<Emoj[]>([]);

  const pageInfoRef = useRef({page: 1, pageSize: 30});
  const [hasMore, setHasMore] = useState(true);

  const fetchList = () => {
    const {page, pageSize} = pageInfoRef.current;
    getEmojList({page, pageSize}).then(res => {
      const {data} = res;
      const {
        list: dataList = [],
        page = 1,
        pageSize = 30,
        total = 0,
      } = data || {};
      const catList = [...list, ...dataList];
      if (catList.length >= total) {
        setHasMore(false);
      }
      pageInfoRef.current = {page, pageSize};
      setList(catList);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const renderItem = ({item}: any) => {
    const {url} = item;
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: url.replace('https://', 'http://'),
          }}
          style={styles.image}
        />
      </View>
    );
  };

  const fetchMore = () => {
    if (!hasMore) {
      return;
    }
    pageInfoRef.current = {page: pageInfoRef.current.page + 1, pageSize: 30};
    console.log(pageInfoRef.current);

    fetchList();
  };

  return (
    <FlatList
      keyExtractor={item => String(item.id)}
      data={list}
      renderItem={renderItem}
      numColumns={3}
      horizontal={false}
      onEndReached={fetchMore}
      ListFooterComponent={() => <Loading />}
    />
  );
}

export default EmojList;
