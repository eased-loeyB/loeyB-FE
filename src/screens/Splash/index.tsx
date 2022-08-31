import React, {FC, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {SPLASH_IMAGE} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {
  ApplicationStackName,
  ApplicationStackNavigationProps,
} from '~/navigation/Application';
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
  const hasUserData = useMemo(
    () =>
      !!userName && categoryAndTags.length > 0 && stardustRecords.length > 0,
    [userName, categoryAndTags, stardustRecords],
  );

  const opacity = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (!isLoggedIn) {
        return replace(ApplicationStackName.AUTH);
      }

      if (!hasUserData) {
        return replace(ApplicationStackName.MAIN);
      }

      // TODO: add redirection to main page
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
