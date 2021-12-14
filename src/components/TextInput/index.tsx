import React, {useState, useRef} from 'react';
import {TextInput} from 'react-native';
import themeMap from '@utils/themeMapStyle';

interface Props {
  defaultValue?: string;
  maxLength?: number;
  style?: any;
  onChangeText?(text?: string): void;
  ref?: any;
}

function Input(props: Props) {
  const {defaultValue, style, maxLength, onChangeText, ...restProps} = props;
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<TextInput | null>();

  const handleChange = (text: string) => {
    setValue(text);
    onChangeText && onChangeText(text);
  };

  return (
    <TextInput
      value={value}
      ref={ref => {
        inputRef.current = ref;
      }}
      style={style}
      onChangeText={handleChange}
      placeholderTextColor={themeMap.$BlackXL}
      maxLength={maxLength}
      {...restProps}
    />
  );
}

export default Input;
