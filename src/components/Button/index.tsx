import React, {useMemo} from 'react';
import {Text, TextStyle, View, ViewProps} from 'react-native';
import PressView from '../PressView';
import Loading from '../Loading';
import themeMap from '@utils/themeMap';
import styles from './styles';

export const Solid = 'Solid';
export const Outline = 'Outline';

interface Props extends ViewProps {
  disable?: boolean;
  loading?: boolean;
  type?: 'Solid' | 'Outline';
  title: string | Element;
  size?: 'small' | 'medium' | 'large';
  textStyle?: TextStyle;
  onPress?(): void;
}

function Component(props: Props) {
  const {
    disable = false,
    loading = false,
    type = 'Solid',
    size = 'medium',
    title,
    style,
    textStyle,
    ...restProps
  } = props;
  const loadColor = {
    Solid: themeMap.$White,
    Outline: themeMap.$Primary,
  };
  const isDisable = disable || loading;

  const stylesText = useMemo(() => {
    switch (size) {
      case 'small':
        return styles.textS;
      case 'large':
        return styles.textL;
      default:
        return styles.textM;
    }
  }, [size]);

  const stylesView = useMemo(() => {
    switch (size) {
      case 'small':
        return styles.textS;
      case 'large':
        return styles.textL;
      default:
        return styles.textM;
    }
  }, [size]);

  const renderTitle = () => {
    return typeof title === 'string' ? (
      <Text
        style={[
          stylesText,
          type === Solid && styles.textSolid,
          type === Outline && styles.textOutline,
          isDisable && styles.textDisable,
          textStyle,
        ]}>
        {title}
      </Text>
    ) : (
      <View
        style={[
          stylesText,
          type === Solid && styles.textSolid,
          type === Outline && styles.textOutline,
          isDisable && styles.textDisable,
          textStyle,
        ]}>
        {title}
      </View>
    );
  };

  const renderNormalButton = () => {
    return (
      <PressView
        style={[
          styles.button,
          type === Solid && styles.buttonSolid,
          type === Outline && styles.buttonOutline,
          isDisable && styles.buttonDisable,
          style,
        ]}
        disable={isDisable}
        {...restProps}>
        {loading && <Loading animating={loading} color={loadColor[type]} />}
        {renderTitle()}
      </PressView>
    );
  };

  return renderNormalButton();
}

export default Component;
