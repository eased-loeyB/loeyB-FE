import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {
  convertFontSize,
  convertHeight,
  convertWidth,
  LightBlue,
  LightBlue2,
} from '../../utils';

export interface ButtonProps {
  title: String;
  callback: () => void;
  enable: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={props.callback} disabled={!props.enable}>
      <View
        style={{
          backgroundColor: LightBlue,
          width: convertWidth(324),
          height: 60,
          opacity: props.enable ? 1 : 0.3,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0D1648',
            fontWeight: '700',
            fontSize: convertFontSize(18),
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
