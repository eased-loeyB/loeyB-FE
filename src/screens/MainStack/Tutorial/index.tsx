import React, {FC} from 'react';
import {Image} from 'react-native';

import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

import {TUTORIAL_PAGE_1, TUTORIAL_PAGE_2, TUTORIAL_PAGE_3} from '~/assets';
import BottomModal from '~/components/BottomModal';
import {ContainerStyle} from '~/utils/Styles';

const Container = styled.View`
  ${ContainerStyle}
`;

const Tutorial: FC = () => {
  return (
    <Swiper>
      <Container>
        <Image
          source={TUTORIAL_PAGE_1}
          style={{width: '100%', height: '100%'}}
        />
      </Container>
      <Container>
        <Image
          source={TUTORIAL_PAGE_2}
          style={{width: '100%', height: '100%'}}
        />
      </Container>
      <Container>
        <Image
          source={TUTORIAL_PAGE_3}
          style={{width: '100%', height: '100%'}}
        />
      </Container>
      <Container>
        <Image
          source={TUTORIAL_PAGE_3}
          style={{width: '100%', height: '100%'}}
        />
        <BottomModal />
      </Container>
    </Swiper>
  );
};

export default Tutorial;
