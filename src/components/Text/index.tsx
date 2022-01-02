import themeMap from '@utils/themeMap';
import React from 'react';

import {TextProps, Text} from 'react-native';

interface Props extends TextProps {}
function Component(props: Props) {
  const {children, style, ...resProps} = props;
  return (
    <Text style={[{color: themeMap.$BlackS}, style]} {...resProps}>
      {children}
    </Text>
  );
}

export default Component;
