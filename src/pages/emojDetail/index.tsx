import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {
  Button,
  Container,
  Divider,
  PressView,
  StatusView,
  Wrap,
  Toast,
  Image,
} from '@components/index';
import {StateStatus} from '@components/StatusView';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  getEmojDetail,
  EmojDetail,
  EmojGroup,
  updateUserEmojRelation,
  updateEmojVisit,
} from '@services/emoj';
import {RootStackParamList} from '@navigation/Stack';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import themeMap from '@utils/themeMap';
import scalePx from '@utils/scalePx';
import saveImage from '@utils/saveImage';
import {useRecoilValue} from 'recoil';
import {userInfoAtom} from '@atom/user';
import * as WeChat from 'react-native-wechat-lib';

export function EmojItem({
  item,
  onPress,
}: {
  item: EmojDetail;
  onPress?(): void;
}) {
  const {url, id, like, visit} = item;

  return (
    <PressView style={styles.item} key={id} onPress={onPress}>
      <Image
        style={styles.item_image}
        resizeMode="contain"
        url={url?.replace('https://', 'http://')}
      />
      <Wrap style={styles.data_wrap} row="center">
        <Wrap flex="row">
          <AntDesignIcon
            name="eye"
            color={themeMap.$Primary}
            size={scalePx(32)}
          />
          <Text style={styles.data_label}>{visit}</Text>
        </Wrap>
        <Wrap style={styles.like_wrap} flex="row">
          <AntDesignIcon
            name="heart"
            color={themeMap.$Primary}
            size={scalePx(24)}
          />
          <Text style={styles.data_label}>{like}</Text>
        </Wrap>
      </Wrap>
    </PressView>
  );
}

function EmojDetailC() {
  const {params} = useRoute<RouteProp<RootStackParamList, 'emojDetail'>>();

  const {id} = params || {};

  const userInfo = useRecoilValue(userInfoAtom);

  const [loading, setLoading] = useState(true);
  const [emojList, setEmojList] = useState<EmojDetail[]>([]);
  const [emojGroup, setEmojGroup] = useState<EmojGroup>();
  const [selectId, setSelectId] = useState<number>(id);

  const [saveImageLoading, setSaveImageLoading] = useState(false);
  const [updateRelationLoading, setUpdateRelationLoading] = useState(false);

  const emoj = useMemo(
    () => emojList.find(o => o.id === selectId),
    [selectId, emojList],
  );

  const islike = useMemo(() => emoj && emoj?.isLike, [emoj]);

  const fetchData = useCallback(async () => {
    getEmojDetail({id: selectId, user_id: userInfo.id as number}).then(res => {
      const {data} = res;
      let {emoj_list = [], emoj_group_info} = data || {};
      emoj_list = emoj_list.map((item: EmojDetail) => ({
        ...item,
        url: item.url?.replace('https://', 'http://'),
      }));
      setEmojGroup(emoj_group_info);
      setEmojList(emoj_list || []);
      setLoading(false);
    });
  }, [selectId, userInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    updateEmojVisit({id: selectId});
  }, []);

  const refresh = async () => {
    await fetchData();
  };

  const handleLike = async () => {
    if (!(emoj && emoj.id)) {
      return;
    }
    if (!(userInfo && userInfo.id)) {
      return;
    }

    setUpdateRelationLoading(true);
    try {
      await updateUserEmojRelation({
        user_id: userInfo.id,
        emoj_id: emoj.id,
        like: islike ? 0 : 1,
      });
      Toast.show({
        type: 'success',
        text1: (islike ? '取消点赞' : '点赞') + '成功!',
      });
      await refresh();
    } catch (error) {
    } finally {
      setUpdateRelationLoading(false);
    }
  };

  const handleSaveImage = async () => {
    if (!emoj) {
      return;
    }
    setSaveImageLoading(true);
    try {
      await saveImage(emoj?.url);
      Toast.show({type: 'success', text1: '表情保存成功!'});
    } catch (error: any) {
      Toast.show({type: 'error', text1: '表情保存失败!', text2: error.message});
    } finally {
      setSaveImageLoading(false);
    }
  };

  if (loading) {
    return <StatusView tips="加载中..." status={StateStatus.StateLoad} />;
  }

  return (
    <Container style={{backgroundColor: themeMap.$White}}>
      <Wrap style={styles.header} col="center" row="center">
        <Image style={styles.logo} url={emoj?.url} resizeMode="contain" />
        <Wrap style={styles.header_btn_wrap} flex="col" row="center">
          <Button
            size="small"
            title="发送到微信"
            onPress={async () => {
              Toast.show({type: 'info', text1: '还在写...'});
              try {
                // WeChat.shareText({
                //   text: 'Text content.',
                //   scene: 0,
                // });
                // await WeChat.shareImage({
                //   imageUrl: emoj?.url?.replace('http://', 'https://') || '',
                //   scene: 0,
                // });
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <Divider height={30} />
          <Wrap>
            <PressView
              style={styles.download_wrap}
              disable={updateRelationLoading}
              onPress={handleLike}>
              <IoniconsIcon
                name={islike ? 'md-heart-sharp' : 'md-heart-outline'}
                size={scalePx(50)}
                color={themeMap.$White}
              />
            </PressView>
            <PressView
              disable={saveImageLoading}
              style={styles.download_wrap}
              onPress={handleSaveImage}>
              <MaterialCommunityIconsIcon
                name="download-circle-outline"
                size={scalePx(58)}
                color={themeMap.$White}
              />
            </PressView>
          </Wrap>
        </Wrap>
      </Wrap>
      <View style={styles.image_wrap}>
        {emojList.map((item: EmojDetail) => {
          return (
            <EmojItem
              key={item.id}
              item={item}
              onPress={() => {
                if (item.id) {
                  setSelectId(item.id);
                }
              }}
            />
          );
        })}
      </View>
    </Container>
  );
}
export default EmojDetailC;
