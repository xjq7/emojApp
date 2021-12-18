import React from 'react';
import {View, Text, Image, ViewProps} from 'react-native';
import Loading from '../Loading';
import Button from '../Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../Divider';
import scalePx from '@utils/scalePx';

import styles from './styles';

export enum StateStatus {
  StateError,
  StateEmpty,
  StateLoad,
}

const imgEmpty = require('@assets/image/empty.png');
const imgError = require('@assets/image/error.png');

interface Props extends ViewProps {
  button?: any;
  status: StateStatus;
  tips?: string;
  LoadComponent?: any;
  onPress?(): void;
}

function StatusView(props: Props) {
  const {
    status,
    button,
    tips = '',
    style,
    LoadComponent,
    onPress,
    children,
  } = props;
  const renderButton = () => {
    if (typeof button === 'string') {
      return (
        <Button
          style={{borderRadius: scalePx(49), width: scalePx(300)}}
          title={button}
          onPress={onPress}
        />
      );
    }
    if (React.isValidElement(button)) {
      return button;
    }
    return null;
  };
  const renderLoading = () => {
    if (React.isValidElement(LoadComponent)) {
      return LoadComponent;
    }
    return <Loading />;
  };
  const renderEmpty = () => {
    return (
      <>
        <Icon name="error-outline" size={scalePx(150)} style={styles.color} />
        <Image
          source={imgEmpty}
          style={{width: scalePx(345), height: scalePx(276)}}
        />
        <Divider height={25} />
        <Text style={styles.color}>{tips}</Text>
        {button && <Divider height={50} />}
        {button && renderButton()}
      </>
    );
  };
  const renderError = () => {
    return (
      <>
        {/* <Icon name="error-outline" size={scalePx(150)} className={styles.color} /> */}
        <Image
          source={imgError}
          style={{width: scalePx(345), height: scalePx(276)}}
        />
        <Divider height={25} />
        <Text style={styles.color}>{tips}</Text>
        {button && <Divider height={50} />}
        {button && renderButton()}
      </>
    );
  };

  const renderChild = () => {
    return <>{children}</>;
  };

  let view = renderChild();
  if (status === StateStatus.StateEmpty) {
    view = renderEmpty();
  }
  if (status === StateStatus.StateLoad) {
    view = renderLoading();
  }
  if (status === StateStatus.StateError) {
    view = renderError();
  }

  return <View style={[styles.content, style]}>{view}</View>;
}

export default StatusView;
