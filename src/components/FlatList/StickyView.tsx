import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Animated} from 'react-native';

function StickyView({children, onLayout, scrollY, nextHeaderLayoutY}, ref) {
  const [measured, setMeasured] = useState(false);
  const [layoutY, setLayoutY] = useState();
  const [layoutHeight, setLayoutHeight] = useState();
  const [nextLayoutY, setNextLayoutY] = useState(nextHeaderLayoutY);

  const inputRange = [-1, 0];
  const outputRange = [0, 0];

  if (measured) {
    inputRange.push(layoutY);
    outputRange.push(0);

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
    setNextHeaderY: y => {
      setNextLayoutY(y);
    },
  }));

  const _onLayout = event => {
    setMeasured(true);
    setLayoutY(event.nativeEvent.layout.y);
    setLayoutHeight(event.nativeEvent.layout.height);
    onLayout(event);
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
