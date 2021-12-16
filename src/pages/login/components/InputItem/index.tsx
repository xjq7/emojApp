import React, {forwardRef} from 'react';
import {View, TextInputProps} from 'react-native';
import ITextInput from '@components/TextInput';
import styles from './styles';

interface Props extends TextInputProps {
  maxLength?: number;
}

function InputItem({style, maxLength = 30, ...restProps}: Props, ref: any) {
  return (
    <View style={[styles.input, style]}>
      <ITextInput
        maxLength={maxLength}
        ref={ref}
        style={styles.input_textInput}
        {...restProps}
      />
    </View>
  );
}

export default forwardRef(InputItem);
