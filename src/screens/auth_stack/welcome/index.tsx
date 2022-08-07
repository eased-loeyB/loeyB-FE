import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import styled from 'styled-components/native';

import {BACKGROUND_INPUT_NAME, BACKGROUND_WELCOME} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import {push} from '~/navigation';
import {MainStackName} from '~/navigation/stacks/MainStack';
import {deviceHeight, deviceWidth} from '~/utils/design';
import {TitleStyle} from '~/utils/Styles';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const CircleWrapper = styled.View`
  position: absolute;
  top: ${deviceHeight / 2 - 250}px;
  left: ${deviceWidth / 2 - 190}px;
`;

const CircleImage = styled.Image`
  width: 152px;
  aspect-ratio: 1;
`;

const Title = styled.Text`
  ${TitleStyle}
  text-align: center;
`;

const ButtonWrapper = styled.View`
  margin-top: 28px;
`;

// @ts-ignore
export const Welcome = ({route}) => {
  const {userName} = route?.params;

  return (
    <BackgroundCommon
      haveFilter={true}
      canGoBack={true}
      title={''}
      filterBG={BACKGROUND_WELCOME}
      customFiler={{top: 150}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Container>
            <CircleWrapper>
              <CircleImage source={BACKGROUND_INPUT_NAME} />
            </CircleWrapper>
            <Container>
              <Title>
                Welcome to loeyB
                {`\n ${userName}`}
              </Title>
            </Container>
          </Container>
          <ButtonWrapper>
            <Button
              title={'Next'}
              callback={() => {
                push(MainStackName.FIRST_MEMORY, {});
              }}
              enable={true}
            />
          </ButtonWrapper>
        </Container>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
