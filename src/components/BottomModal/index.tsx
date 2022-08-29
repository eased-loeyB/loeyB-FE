import React, {FC, useCallback, useState} from 'react';
import {View} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';
import {deviceHeight, deviceWidth} from '~/utils/design';

const Base = styled(Animated.View)`
  height: 100px;
  width: 100%;
  align-items: center;
  padding-top: 10px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const Handle = styled.View`
  width: 66px;
  height: 4px;
`;

const Text = styled(Animated.Text)`
  color: ${ColorMap.LightBlue2};
  margin-top: 10px;
`;

const MAX_TRANSLATE_Y = -deviceHeight + 150;

const BottomModal: FC = () => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const [expand, setExpand] = useState(false);
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      //  translateY.value = Math.max(translateY.value, SCREEN_HIGHT);
    })
    .onEnd(() => {
      if (translateY.value >= -deviceHeight / 1.5) {
        // runOnJS(() => {
        //   setExpand(false);
        // })
        scrollTo(0);
      } else if (translateY.value < -deviceHeight / 10) {
        scrollTo(MAX_TRANSLATE_Y);
        // runOnJS(() => {
        //   setExpand(true);
        // })
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const expanded = translateY.value === 0;
    return {
      backgroundColor: expanded ? 'rgba(244, 250, 255, 0.12)' : '#051329',
      transform: [{translateY: translateY.value}],
    };
  });

  const textStyles = useAnimatedStyle(() => {
    const expanded = translateY.value === MAX_TRANSLATE_Y;
    return {
      opacity: expanded ? 0 : 1,
    };
  });

  // useEffect(() => {
  //   scrollTo(-deviceHeight / 50);
  // });

  return (
    <GestureDetector gesture={gesture}>
      <Base style={rBottomSheetStyle}>
        <Handle />
        {!expand && <Text style={textStyles}>Swipe up to save</Text>}
        <View
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
        />
      </Base>
    </GestureDetector>
  );
};

export default BottomModal;
