import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  convertHeight,
  deviceHeight,
  deviceWidth,
  LightBlue2,
} from '../../utils';
const MAX_TRANSLATE_Y = -deviceHeight + 150;

export const BottomModal = () => {
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
      opacity: expanded ?  0 : 1
    };
  });

  // useEffect(() => {
  //   scrollTo(-deviceHeight / 50);
  // });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.box, rBottomSheetStyle]}>
        <View style={{height: 4, width: 66}} />
        {!expand && (
          <Animated.Text style={[{marginTop: 10, color: LightBlue2}, textStyles]}>
            Swipe up to save
          </Animated.Text>
        )}
        <View
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
        >
          
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  box: {
    height: convertHeight(100),
    //  position: 'absolute',
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    // top: SCREEN_HIGHT,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});
