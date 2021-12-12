import React from 'react';
import Modal, {ModalProps} from 'react-native-modal';
interface Props extends ModalProps {}

function Index(props: Props) {
  const {children, ...restProps} = props;
  return <Modal {...restProps}>{children}</Modal>;
}

export default Index;
