import React, {FC} from 'react';

import {rgba} from 'polished';
import RadialGradient from 'react-native-radial-gradient';
import styled, {css} from 'styled-components';

import BackgroundCommon from '~/components/BackgroundCommon';
import {ColorMap} from '~/utils/Colors';
import {ContainerStyle} from '~/utils/Styles';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const TopContainer = styled.View`
  top: -78px;
`;

const Container = styled.View`
  ${ContainerStyle}
`;

const CircleStyle = css`
  position: absolute;
  background-color: transparent;
  border-radius: 9999px;
`;

const FirstCircle = styled.View`
  ${CircleStyle}
  width: 302px;
  height: 307px;
  border-width: 16px;
  border-color: ${rgba(ColorMap.LightBlue, 0.12)};
`;

const SecondCircle = styled.View`
  ${CircleStyle}
  width: 270px;
  height: 275px;
  border-width: 12px;
  border-color: ${rgba(ColorMap.LightBlue, 0.3)};
`;

const InnerCircle = styled(RadialGradient)`
  ${ContainerStyle}
  ${CircleStyle}
  width: 246px;
  height: 251px;
  overflow: hidden;
  background-color: ${ColorMap.LightBlue};
`;

const MainPage: FC = () => {
  return (
    <BackgroundCommon>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TopContainer>
          <Container>
            <FirstCircle />
            <SecondCircle />
            <InnerCircle
              colors={[
                rgba(ColorMap.LightBlue2, 0),
                rgba(ColorMap.LightBlue2, 1),
              ]}
              center={[88, 88]}
              radius={176}
            />
          </Container>
        </TopContainer>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

export default MainPage;
