import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CLEAR_ICON, DELETE_MODAL} from '../../../assets';
import {
  convertHeight,
  convertWidth,
  DarkBlue,
  LightBlue2,
} from '../../../utils';
import Modal from 'react-native-modal';

export interface DeleteModalProps {
  open: boolean;
  dismiss: () => void;
  callback: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Modal
      isVisible={props.open}
      onDismiss={() => {
        props.dismiss();
      }}>
      <View
        style={{
          width: convertWidth(325),
          height: convertHeight(270),
          backgroundColor: DarkBlue,
          borderRadius: 50,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={props.dismiss} style={{
            position: 'absolute',
            top: 29,
            right: 32,
        }}>
          <Image
            source={CLEAR_ICON}
            style={{tintColor: LightBlue2,}}
          />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={DELETE_MODAL} style={{marginBottom: 16}} />
          <Text style={{color: LightBlue2, width: 251, textAlign: 'center'}}>
            Are you sure to delete this image from your device album
          </Text>
        </View>
        <TouchableOpacity onPress={props.callback}>
          <View
            style={{
              width: convertWidth(325),
              height: convertHeight(65),
              backgroundColor: LightBlue2,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            <Text style={{color: '#051329', fontWeight: '600', fontSize: 18}}>
              Delete from device album
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
