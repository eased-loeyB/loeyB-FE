import React, {FC} from 'react';
import {Image} from 'react-native';

import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import {CLEAR_ICON, DELETE_MODAL} from '~/assets';
import {ColorMap} from '~/utils/Colors';
import {ContainerStyle} from '~/utils/Styles';

export interface DeleteModalProps {
  open: boolean;
  dismiss: () => void;
  callback: () => void;
}

const Wrapper = styled.View`
  width: 324px;
  height: 270px;
  background-color: ${ColorMap.DarkBlue};
  border-radius: 50px;
  align-items: center;
`;

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  top: 28px;
  right: 32px;
`;

const Container = styled.View`
  ${ContainerStyle}
`;

const DeleteIcon = styled.Image`
  margin-bottom: 16px;
`;

const AlertText = styled.Text`
  color: ${ColorMap.LightBlue2};
  width: 252px;
  text-align: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  width: 324px;
  height: 64px;
  background-color: ${ColorMap.LightBlue2};
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const ConfirmText = styled.Text`
  color: ${ColorMap.Navy};
  font-weight: 600;
  font-size: 18px;
`;

const DeleteModal: FC<DeleteModalProps> = ({open, dismiss, callback}) => (
  <Modal isVisible={open} onDismiss={dismiss}>
    <Wrapper>
      <ClearButton onPress={dismiss}>
        <Image source={CLEAR_ICON} style={{tintColor: ColorMap.LightBlue2}} />
      </ClearButton>
      <Container>
        <DeleteIcon source={DELETE_MODAL} />
        <AlertText>
          Are you sure to delete this image from your device album
        </AlertText>
      </Container>
      <ConfirmButton onPress={callback}>
        <ConfirmText>Delete from device album</ConfirmText>
      </ConfirmButton>
    </Wrapper>
  </Modal>
);

export default DeleteModal;
