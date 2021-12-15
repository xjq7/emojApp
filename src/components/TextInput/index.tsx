import React, {useState, useRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import themeMap from '@utils/themeMap';

interface Props extends TextInputProps {
  defaultValue?: string;
  onChangeText?(text?: string): void;
  ref?: React.RefObject<TextInput>;
}

function Input(props: Props) {
  const {defaultValue, style, onChangeText, ...restProps} = props;
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
      {...restProps}
    />
  );
}

export default Input;
