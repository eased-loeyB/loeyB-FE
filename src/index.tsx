import React, {useEffect, useRef, useState} from 'react';
import {Image, View, Animated, Easing} from 'react-native';
import App from './App';
import BackgroundCommon from './components/BackgroundCommon';
import {SPLASH_IMAGE} from './assets';

export const Splash = () => {
  const [splashing, setSplashing] = useState(true);
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
      setSplashing(false);
    }, 3000);
  }, []);
  if (splashing) {
    return (
      <BackgroundCommon>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Animated.Image source={SPLASH_IMAGE} style={animatedStyles} />
        </View>
      </BackgroundCommon>
    );
  } else {
    return <App/>;
  }
};
