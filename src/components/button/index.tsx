import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

import {LightBlue} from '~/utils/Colors';
import {convertFontSize} from '~/utils/design';

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
