import React, {memo} from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

import {ARROW_BACK, FILTER_IMAGE} from '~/assets';
import {goBack} from '~/navigation';
import {convertWidth, deviceHeight, deviceWidth} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';

export interface BackgroundCommonProps {
  children: JSX.Element;
  haveFilter?: boolean;
  canGoBack?: boolean;
  title?: string;
  filterBG?: ImageRequireSource;
  customFiler?: ImageStyle;
  edges?: Edge[];
}

const BackgroundCommon = ({
  children,
  haveFilter,
  canGoBack,
  title,
  filterBG,
  customFiler,
  edges,
}: BackgroundCommonProps) => {
  return (
    <RadialGradient
      style={{flex: 1}}
      colors={['#272F5C', '#13132D', '#08070F']}
      stops={[0, 0.55, 1]}
      center={[deviceWidth / 2, deviceHeight / 2]}
      radius={convertWidth(deviceWidth)}>
      {haveFilter && (
        <Image
          source={filterBG ?? FILTER_IMAGE}
          style={{position: 'absolute', top: 15, left: 24, ...customFiler}}
        />
      )}
      <SafeAreaView
        style={{flex: 1}}
        edges={edges ?? ['bottom', 'left', 'right', 'top']}>
        {canGoBack && (
          <View style={styles.container}>
            <TouchableOpacity style={styles.iconBack} onPress={() => goBack()}>
              <Image source={ARROW_BACK} />
            </TouchableOpacity>
            <Text style={CommonStyles.title}>{title}</Text>
          </View>
        )}
        {children}
      </SafeAreaView>
    </RadialGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  iconBack: {
    position: 'absolute',
    top: 48,
    left: 24,
  },
});

export default memo(BackgroundCommon);
