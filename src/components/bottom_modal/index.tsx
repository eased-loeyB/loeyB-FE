import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {convertHeight, LightBlue2} from '../../utils';

export const BottomModal = () => {
  const boxHeight = useSharedValue(50);
  const boxAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(boxHeight.value, {duration: 750}),
    };
  });
  function toggleHeight() {
    boxHeight.value === 850 ? (boxHeight.value = 100) : (boxHeight.value = 850);
  }

  return (
    <Animated.View style={[styles.box, boxAnimation]}>
      <View style={{height: 4, width: 66, backgroundColor: 'black'}} />
      <Text
        style={{marginTop: 10, color: LightBlue2}}
        onPress={() => toggleHeight()}>
        Swipe up to save
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(244, 250, 255, 0.12)',
    height: convertHeight(30),
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});
