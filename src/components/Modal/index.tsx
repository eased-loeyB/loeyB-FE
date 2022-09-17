import React, {FC, ReactNode} from 'react';
import {Image, ImageSourcePropType} from 'react-native';

import BaseModal from 'react-native-modal';
import styled from 'styled-components/native';

import {CLEAR_ICON} from '~/assets';
import {ColorMap} from '~/utils/Colors';

export interface ModalProps {
  open: boolean;
  dismiss: () => void;
  callback?: () => void;
  content: ReactNode;
  hasClearButton?: boolean;
  iconSource?: ImageSourcePropType;
  buttonText?: ReactNode;
}

const Wrapper = styled.View`
  width: 100%;
  background-color: ${ColorMap.DarkBlue};
  border-radius: 24px;
`;

const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 24px 20px;
`;

const ClearButtonWrapper = styled.View`
  width: 100%;
  margin-right: 8px;
`;

const ClearButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  align-self: flex-end;
`;

const Icon = styled.Image`
  margin: 16px 0;
`;

const AlertText = styled.Text`
  color: ${ColorMap.LightBlue2};
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  background-color: ${ColorMap.LightBlue2};
  justify-content: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

const ConfirmText = styled.Text`
  color: ${ColorMap.Navy};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const Modal: FC<ModalProps> = ({
  open,
  dismiss,
  callback,
  content,
  hasClearButton = true,
  buttonText,
  iconSource,
}) => (
  <BaseModal
    isVisible={open}
    onBackdropPress={dismiss}
    onBackButtonPress={dismiss}>
    <Wrapper>
      <Container>
        {hasClearButton && (
          <ClearButtonWrapper>
            <ClearButton onPress={dismiss}>
              <Image
                source={CLEAR_ICON}
                style={{tintColor: ColorMap.LightBlue2}}
              />
            </ClearButton>
          </ClearButtonWrapper>
        )}
        {iconSource && <Icon source={iconSource} />}
        <AlertText>{content}</AlertText>
      </Container>
      {buttonText && (
        <ConfirmButton onPress={callback ?? dismiss}>
          <ConfirmText>{buttonText}</ConfirmText>
        </ConfirmButton>
      )}
    </Wrapper>
  </BaseModal>
);

export default Modal;
