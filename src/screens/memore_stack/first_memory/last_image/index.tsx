import React from 'react';
import {Image, View} from 'react-native';
import {HAND} from '../../../../assets';
import {convertHeight, convertWidth} from '../../../../utils';

export const LastImage = () => {
  return (
    <View style={{width: convertWidth(325), height: convertHeight(330)}}>
      <Image source={HAND} />
    </View>
  );
};
