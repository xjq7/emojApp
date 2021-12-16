import React from 'react';
import {TouchableOpacity, View, Keyboard, ViewProps} from 'react-native';
import {debounce, noop} from 'lodash';
// @ts-ignore
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface Props extends ViewProps {
  onPress?(): void;
  onPressOut?(): void;
  debounceTime?: number;
  hideKeyboard?: boolean;
  disable?: boolean;
  bounce?: boolean;
  vibrate?: boolean;
}

function Component(props: Props) {
  const {
    style,
    onPress = noop,
    onPressOut = noop,
    debounceTime = 300,
    hideKeyboard = true,
    disable = false,
    children,
    bounce = true,
    vibrate = false,
    ...restProps
  } = props;
  const TouchView = bounce ? TouchableBounce : TouchableOpacity;

  if (disable) {
    return (
      <View style={style} {...restProps}>
        {children}
      </View>
    );
  }

  const handlePress = () => {
    if (hideKeyboard) {
      Keyboard.dismiss();
    }
    onPress();
  };

  const handlePressOut = () => {
    if (vibrate) {
      const options = {
        enableVibrateFallback: vibrate,
        ignoreAndroidSystemSettings: false,
      };
      ReactNativeHapticFeedback.trigger('impactLight', options);
    }
    onPressOut();
  };

  return (
    <TouchView
      onPressOut={debounce(handlePressOut, debounceTime)}
      onPress={debounce(handlePress, debounceTime)}
      style={style}
      {...restProps}>
      {children}
    </TouchView>
  );
}

export default Component;
