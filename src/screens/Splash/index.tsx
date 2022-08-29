import React, {FC, useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {SPLASH_IMAGE} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {
  ApplicationStackName,
  ApplicationStackNavigationProps,
} from '~/navigation/Application';
import {MainStackName} from '~/navigation/stacks/MainStack';
import {useTypedSelector} from '~/store';
import {ContainerStyle} from '~/utils/Styles';

const Container = styled.View`
  ${ContainerStyle}
`;

const SplashImage = styled(Animated.Image)<{opacity: Animated.Value}>`
  opacity: ${({opacity}) => Number(opacity) || 0};
`;

const Splash: FC = () => {
  const {replace} = useNavigation<ApplicationStackNavigationProps>();
  const {
    authData: {isLoggedIn},
    userData: {userName, categoryAndTags, stardustRecords},
  } = useTypedSelector(({user}) => user);

  const opacity = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (isLoggedIn) {
        if (stardustRecords.length) {
          // TODO: go to main page
          return replace(MainStackName.FIRST_MEMORY);
        }

        if (categoryAndTags.length) {
          return replace(MainStackName.FIRST_MEMORY);
        }

        if (userName) {
          return replace(MainStackName.SELECT_CATEGORY);
        }

        return replace(MainStackName.INPUT_NAME);
      }

      return replace(ApplicationStackName.AUTH);
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
