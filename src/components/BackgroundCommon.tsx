import React, {memo} from 'react';
import {convertWidth, deviceHeight, deviceWidth} from '../utils';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {ARROW_BACK, FILTER_IMAGE, SPLASH_IMAGE} from '../assets';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '../navigation';

export interface BackgroundCommonProps {
  children: JSX.Element;
  haveFilter?: boolean;
  canGoBack?: boolean;
}

const BackgroundCommon = ({
  children,
  haveFilter,
  canGoBack,
}: BackgroundCommonProps) => {
  return (
    <RadialGradient
      style={{flex: 1}}
      colors={['#272F5C', '#13132D', '#08070F']}
      stops={[0, 0.55, 1]}
      center={[deviceWidth / 2, deviceHeight / 2]}
      radius={convertWidth(375)}>
      {haveFilter && (
        <Image
          source={FILTER_IMAGE}
          style={{position: 'absolute', top: 15, left: 24}}
        />
      )}
      <SafeAreaView style={{flex: 1}}>
        {canGoBack && (
          <TouchableOpacity onPress={() => goBack()}>
            <View
              style={{
                paddingHorizontal: 24,
                paddingTop: 38,
                paddingBottom: 20,
                width: '20%',
              }}>
              <Image source={ARROW_BACK} />
            </View>
          </TouchableOpacity>
        )}
        {children}
      </SafeAreaView>
    </RadialGradient>
  );
};

export default memo(BackgroundCommon);
