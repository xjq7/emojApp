import React from 'react';
import {Keyboard} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import {useBackHandler} from '@react-native-community/hooks';

interface Props extends ModalProps {}

function Index(props: Props) {
  const {
    children,
    isVisible,
    onModalWillShow,
    onModalWillHide,
    onBackButtonPress,
    hideModalContentWhileAnimating = true,
    useNativeDriver = true,
    backdropOpacity = 0.7,
    coverScreen = false,
    ...restProps
  } = props;

  useBackHandler(() => {
    if (isVisible) {
      onBackButtonPress();
    }
    return isVisible;
  });

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={coverScreen}
      backdropOpacity={backdropOpacity}
      useNativeDriver={useNativeDriver}
      hideModalContentWhileAnimating={hideModalContentWhileAnimating}
      onModalWillShow={onModalWillShow || hideKeyboard}
      onModalWillHide={onModalWillHide || hideKeyboard}
      {...restProps}>
      {children}
    </Modal>
  );
}

export default Index;
