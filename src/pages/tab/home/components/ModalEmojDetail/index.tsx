import React from 'react';
import {View, Text, Image} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Toast, Divider, Button, Modal, PressView} from '@components/index';
import RToast from 'react-native-toast-message';
import styles from './styles';
import {PermissionsAndroid, Platform} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

import RNFS from 'react-native-fs'; //文件处理
import themeMap from '@utils/themeMap';

const storeLocation = `${RNFS.DocumentDirectoryPath}`;

export interface ModalData {
  url: string;
}

interface Props {
  isVisible: boolean;
  onClose(): void;
  data?: ModalData;
}

function ModalEmojDetail(props: Props) {
  const {onClose, isVisible, data} = props;

  const url = (data && data.url) || '';

  const handleSave = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    let pathName = new Date().getTime() + '.png';
    let downloadDest = `${storeLocation}/${pathName}`;
    const ret = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    });
    ret.promise.then(res => {
      if (res && res.statusCode === 200) {
        var promise = CameraRoll.save('file://' + downloadDest);
        promise
          .then(function () {
            Toast.show({type: 'success', text1: '保存成功!'});
          })
          .catch(function (error) {
            Toast.show({
              type: 'error',
              text1: '保存失败!',
              text2: JSON.stringify(error.message),
            });
          });
      }
    });
  };

  return (
    <Modal
      style={{alignItems: 'center'}}
      isVisible={isVisible}
      coverScreen={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={() => {
        onClose();
      }}>
      {isVisible && (
        <View style={styles.container}>
          <Image
            source={{
              uri: url,
            }}
            style={styles.image}
          />
          <Divider height={20} />
          <Button style={styles.btn} title="保存" onPress={handleSave} />
          <PressView style={styles.close} onPress={onClose}>
            <IoniconsIcon
              name="md-close-sharp"
              color={themeMap.$BlackM}
              size={30}
            />
          </PressView>
        </View>
      )}
      <RToast />
    </Modal>
  );
}

export default ModalEmojDetail;
