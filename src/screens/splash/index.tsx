import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';

import {SPLASH_IMAGE} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';

export const Splash = () => {
  const opacity = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: 1,
      duration: 10000,
      easing: Easing.elastic(10),
    }).start();
  }, [opacity]);

  const animatedStyles = [
    {
      opacity,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      navigate(NameScreenAuthStack.LOGIN, {});
    }, 3000);
  }, []);
  return (
    <BackgroundCommon>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Image source={SPLASH_IMAGE} style={animatedStyles} />
      </View>
    </BackgroundCommon>
  );
};
