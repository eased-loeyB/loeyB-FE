import React from 'react';
import {Image} from 'react-native';

import styled from 'styled-components/native';

import {HAND} from '~/assets';
import {convertHeight, convertWidth} from '~/utils/design';

const ImageWrapper = styled.View`
  width: ${convertWidth(325)}px;
  height: ${convertHeight(330)}px;
`;

export const LastImage = () => {
  return (
    <ImageWrapper>
      <Image source={HAND} />
    </ImageWrapper>
  );
};
