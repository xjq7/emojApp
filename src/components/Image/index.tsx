import styles from '@components/Container/styles';
import React from 'react';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import {Loading} from '..';

interface Props {
  url?: string;
  resizeMode?: ResizeMode;
  style?: any;
}

function Component(props: Props) {
  const {url = '', style = {}, resizeMode = 'cover'} = props;
  if (!url) return <Loading />;
  return (
    <FastImage
      style={[{width: style.width, height: style.height}, style]}
      source={{
        uri: url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={resizeMode}
    />
  );
}

export default Component;
