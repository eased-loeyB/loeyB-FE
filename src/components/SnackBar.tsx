import React, {FC} from 'react';
import {ImageSourcePropType} from 'react-native';

import styled from 'styled-components/native';

import {CLEAR_ICON} from '~/assets';
import {ColorMap} from '~/utils/Colors';
import {deviceWidth} from '~/utils/design';

interface SnackBarProps {
  text: string;
  error?: boolean;
  icon?: ImageSourcePropType;
  onClose?: () => void;
}

type StyleProps = Pick<SnackBarProps, 'error'>;

const Container = styled.View`
  width: ${deviceWidth};
`;

const ContentRow = styled.View<StyleProps>`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 16px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({error}) =>
    error ? ColorMap.ErrorLight : ColorMap.Primary};
`;

const MessageSection = styled.View`
  flex: 1;
`;

const ContentText = styled.Text<StyleProps>`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.1;
  color: ${({error}) => (error ? ColorMap.ErrorMain : ColorMap.White)};
`;

const IconButton = styled.TouchableOpacity`
  width: 28px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image<StyleProps>`
  width: 24px;
  height: 24px;
  tint-color: ${({error}) => (error ? ColorMap.ErrorMain : ColorMap.White)};
`;

const SnackBar: FC<SnackBarProps> = ({
  text,
  error,
  icon = CLEAR_ICON,
  onClose,
}) => (
  <Container>
    <ContentRow error={error}>
      <MessageSection>
        <ContentText error={error}>{text}</ContentText>
      </MessageSection>

      <IconButton onPress={onClose}>
        <Icon source={icon} resizeMode="contain" error={error} />
      </IconButton>
    </ContentRow>
  </Container>
);

export default SnackBar;
