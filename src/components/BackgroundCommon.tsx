import React, {FC, memo} from 'react';
import {Image, ImageRequireSource, ImageStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {ARROW_BACK, FILTER_IMAGE} from '~/assets';
// import {goBack} from '~/navigation';
import {deviceHeight, deviceWidth} from '~/utils/design';
import {TitleStyle} from '~/utils/Styles';

export interface BackgroundCommonProps {
  children: JSX.Element;
  haveFilter?: boolean;
  canGoBack?: boolean;
  title?: string;
  filterBG?: ImageRequireSource;
  customFiler?: ImageStyle;
  edges?: Edge[];
}

const Base = styled(RadialGradient)`
  flex: 1;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  top: 16;
  left: 24;
`;

const Wrapper = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled.View`
  flex-direction: row;
  padding: 24px 16px;
  justify-content: space-between;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 48px;
  left: 24px;
`;

const Title = styled.Text`
  ${TitleStyle}
`;

const BackgroundCommon: FC<BackgroundCommonProps> = ({
  children,
  haveFilter,
  canGoBack,
  title,
  filterBG,
  customFiler,
  edges,
}) => {
  const {goBack} = useNavigation();

  return (
    <Base
      colors={['#272F5C', '#13132D', '#08070F']}
      stops={[0, 0.55, 1]}
      center={[deviceWidth / 2, deviceHeight / 2]}
      radius={deviceWidth}>
      {haveFilter && (
        <BackgroundImage
          source={filterBG ?? FILTER_IMAGE}
          style={customFiler}
        />
      )}
      <Wrapper edges={edges ?? ['bottom', 'left', 'right', 'top']}>
        {canGoBack && (
          <Container>
            <BackButton onPress={goBack}>
              <Image source={ARROW_BACK} />
            </BackButton>
            <Title>{title}</Title>
          </Container>
        )}
        {children}
      </Wrapper>
    </Base>
  );
};

export default memo(BackgroundCommon);
