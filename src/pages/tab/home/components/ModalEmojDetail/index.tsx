import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from '@components/Modal';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from '@components/Toast';
import styles from './styles';

import {PermissionsAndroid, Platform} from 'react-native';

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
  return (
    <Modal
      style={{alignItems: 'center'}}
      isVisible={isVisible}
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
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              if (
                Platform.OS === 'android' &&
                !(await hasAndroidPermission())
              ) {
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
                      console.log(error);

                      Toast.show({
                        type: 'error',
                        text1: '保存失败!',
                        text2: JSON.stringify(error.message),
                      });
                    });
                }
              });
            }}>
            <Text style={styles.btnLabel}>保存</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
}

export default ModalEmojDetail;
