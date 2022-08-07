import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

export interface ButtonProps {
  title: String;
  callback: () => void;
  enable: boolean;
}

const Wrapper = styled.View<Pick<ButtonProps, 'enable'>>`
  height: 60px;
  opacity: ${({enable}) => (enable ? 1 : 0.3)};
  border-radius: 16px;
  background-color: ${ColorMap.LightBlue};
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${ColorMap.NavyNightsky};
`;

export const Button = ({callback, enable, title}: ButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={callback} disabled={!enable}>
      <Wrapper enable={enable}>
        <ButtonText>{title}</ButtonText>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
