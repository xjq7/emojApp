import React, {useState, useEffect, useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {GetEmojBody, getEmojList, GetEmojBodyType} from '@services/emoj';
import {Loading} from '@components/index';
import FlatList from '@components/FlatList';
import styles from './styles';
import ModalEmojDetail, {ModalData} from '../ModalEmojDetail';
import useInfinityList from '@hooks/useInfinityList';

function EmojList(props: {type?: GetEmojBodyType; name?: string}) {
  const {type, name = ''} = props;

  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

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

  const hideModal = () => {
    setIsVisible(false);
  };
  const showModal = () => {
    setIsVisible(true);
  };

  const renderItem = ({item}: any) => {
    const {url} = item;
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            setModalData({url: url.replace('https://', 'http://')});
            showModal();
          }}>
          <Image
            source={{
              uri: url.replace('https://', 'http://'),
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (!array) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        data={Array.isArray(array) ? array : []}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        numColumns={3}
        horizontal={false}
        refreshing={isRefresh}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
      <ModalEmojDetail
        isVisible={isVisible}
        data={modalData}
        onClose={hideModal}
      />
    </>
  );
}

export default EmojList;
