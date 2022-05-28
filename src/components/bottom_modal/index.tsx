import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {convertHeight, LightBlue2} from '../../utils';
const {height: SCREEN_HIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HIGHT + 200;

export const BottomModal = () => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      console.log(event.translationY);
      translateY.value = event.translationY + context.value.y;
      //  translateY.value = Math.max(translateY.value, SCREEN_HIGHT);
    })
    .onEnd(() => {
      if (translateY.value >= -SCREEN_HIGHT / 1.5) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HIGHT / 10) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    scrollTo(-SCREEN_HIGHT / 50);
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.box, rBottomSheetStyle]}>
        <View style={{height: 4, width: 66, backgroundColor: 'black'}} />
        <Text style={{marginTop: 10, color: LightBlue2}}>Swipe up to save</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(244, 250, 255, 0.12)',
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
