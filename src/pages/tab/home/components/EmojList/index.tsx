import React, {useState, useEffect, useRef, useCallback} from 'react';
import {FlatList, View, Image, TouchableOpacity, Text} from 'react-native';
import {Emoj, getEmojList, GetEmojBodyType} from '@services/emoj';
import {Loading} from '@components/index';
import styles from './styles';
import ModalEmojDetail, {ModalData} from '../ModalEmojDetail';
import scalePx from '@utils/scalePx';

function EmojList(props: {type?: GetEmojBodyType; name?: string}) {
  const {type, name = ''} = props;
  console.log(name);

  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const [list, setList] = useState<Emoj[]>([]);

  const pageInfoRef = useRef({page: 1, pageSize: 30});
  const [hasMore, setHasMore] = useState(true);

  const fetchList = useCallback(() => {
    const {page, pageSize} = pageInfoRef.current;
    const body: any = {
      page,
      pageSize,
    };
    if (type) {
      body.type = type;
    }
    if (name) {
      body.name = name;
    }
    getEmojList(body).then(res => {
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
  }, [type, name]);

  useEffect(() => {
    pageInfoRef.current = {page: 1, pageSize: 30};
    setList([]);
  }, [name]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

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

  const fetchMore = () => {
    if (!hasMore) {
      return;
    }
    pageInfoRef.current = {page: pageInfoRef.current.page + 1, pageSize: 30};

    fetchList();
  };

  return (
    <>
      <FlatList
        keyExtractor={item => String(item.id)}
        data={list}
        renderItem={renderItem}
        numColumns={3}
        horizontal={false}
        onEndReached={fetchMore}
        ListFooterComponent={() =>
          hasMore ? (
            <Loading />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                height: scalePx(40),
                lineHeight: scalePx(40),
              }}>
              没有更多图片了...
            </Text>
          )
        }
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
