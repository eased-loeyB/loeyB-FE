import React, {FC} from 'react';

import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {BACKGROUND_INPUT_NAME, BACKGROUND_WELCOME} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import Button from '~/components/Button';
import {
  MainStackName,
  MainStackNavigationProps,
} from '~/navigation/stacks/MainStack';
import {useTypedSelector} from '~/store';
import {deviceHeight} from '~/utils/design';
import {BottomWrapperStyle, ContainerStyle, TitleStyle} from '~/utils/Styles';

const Container = styled.View`
  ${ContainerStyle}
`;

const CircleWrapper = styled(Container)`
  position: absolute;
  top: ${deviceHeight / 2 - 254}px;
`;

const CircleImage = styled.Image`
  width: 152px;
  aspect-ratio: 1;
`;

const TitleWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 120px;
`;

const Title = styled.Text`
  ${TitleStyle}
  text-align: center;
`;

const Subtitle = styled(Title)`
  font-size: 18px;
  line-height: 32px;
`;

const ButtonWrapper = styled.View`
  ${BottomWrapperStyle}
`;

const Welcome: FC = () => {
  const {userName} = useTypedSelector(({user: {userData}}) => userData);
  const {push} = useNavigation<MainStackNavigationProps>();

  return (
    <BackgroundCommon
      haveFilter={true}
      canGoBack={true}
      isAuth={false}
      filterBG={BACKGROUND_WELCOME}
      customFiler={{top: 150}}>
      <Container>
        <CircleWrapper>
          <CircleImage source={BACKGROUND_INPUT_NAME} />
        </CircleWrapper>

        <TitleWrapper>
          <Title>{`Welcome to loeyB,\n${userName}`}</Title>
          <Subtitle>{'Let’s learn how to\nsave moments as stardusts'}</Subtitle>
        </TitleWrapper>

        <ButtonWrapper>
          <Button
            title={'Next'}
            callback={() => {
              push(MainStackName.FIRST_MEMORY);
            }}
            enable={true}
          />
        </ButtonWrapper>
      </Container>
    </BackgroundCommon>
  );
};

export default Welcome;
