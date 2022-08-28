import React, {FC, useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {SPLASH_IMAGE} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {
  ApplicationStackName,
  ApplicationStackNavigationProps,
} from '~/navigation/Application';
import {RootState} from '~/store';
import {ContainerStyle} from '~/utils/Styles';

const Container = styled.View`
  ${ContainerStyle}
`;

const SplashImage = styled(Animated.Image)<{opacity: Animated.Value}>`
  opacity: ${({opacity}) => Number(opacity) || 0};
`;

const Splash: FC = () => {
  const {navigate} = useNavigation<ApplicationStackNavigationProps>();
  const {isLoggedIn} = useSelector((state: RootState) => state.user.authData);

  const opacity = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (isLoggedIn) {
        navigate(ApplicationStackName.MAIN);
      } else {
        navigate(ApplicationStackName.AUTH);
      }
    }, 3000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: 1,
      duration: 10000,
      easing: Easing.elastic(10),
    }).start();
  }, [opacity]);

  return (
    <BackgroundCommon>
      <Container>
        <SplashImage source={SPLASH_IMAGE} opacity={opacity} />
      </Container>
    </BackgroundCommon>
  );
};

export default Splash;
