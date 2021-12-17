import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react';
import {Animated, LayoutChangeEvent, ViewProps} from 'react-native';

interface Props extends Animated.AnimatedProps<ViewProps> {
  scrollY: Animated.Value;
  nextHeaderLayoutY: Animated.Value;
}

function StickyView(
  {children, onLayout, scrollY, nextHeaderLayoutY}: Props,
  ref: ForwardedRef<any>,
) {
  const [measured, setMeasured] = useState(false);
  const [layoutY, setLayoutY] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [nextLayoutY, setNextLayoutY] = useState(nextHeaderLayoutY);

  const inputRange = [-1, 0];
  const outputRange = [0, 0];

  if (measured) {
    inputRange.push(layoutY);
    outputRange.push(0);

    // @ts-ignore
    const collisionPoint = (nextLayoutY || 0) - layoutHeight;
    if (collisionPoint >= layoutY) {
      inputRange.push(collisionPoint, collisionPoint + 1);
      outputRange.push(collisionPoint - layoutY, collisionPoint - layoutY);
    } else {
      inputRange.push(layoutY + 1);
      outputRange.push(1);
    }
  }

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange,
  });

  useImperativeHandle(ref, () => ({
    setNextHeaderY: (y: Animated.Value) => {
      setNextLayoutY(y);
    },
  }));

  const _onLayout = (event: LayoutChangeEvent) => {
    setMeasured(true);
    setLayoutY(event.nativeEvent.layout.y);
    setLayoutHeight(event.nativeEvent.layout.height);
    onLayout && onLayout(event);
  };

  return (
    <Animated.View
      collapsable={false}
      style={{
        zIndex: 10,
        transform: [
          {
            translateY,
          },
        ],
      }}
      onLayout={_onLayout}>
      {children}
    </Animated.View>
  );
}

export default forwardRef(StickyView);
