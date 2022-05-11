import React, {memo} from 'react';
import {convertWidth, deviceHeight, deviceWidth} from '../utils';
import {
  Animated,
  Image,
  ImageRequireSource,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ARROW_BACK, FILTER_IMAGE, SPLASH_IMAGE} from '../assets';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '../navigation';
import {CommonStyles} from '../utils/Styles';

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
      radius={convertWidth(375)}>
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
            <TouchableOpacity onPress={() => goBack()}>
              <View style={styles.iconBack}>
                <Image source={ARROW_BACK} />
              </View>
            </TouchableOpacity>
            <Text style={CommonStyles.title}>{title}</Text>
            <View />
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
    paddingTop: 38,
    paddingBottom: 20,
  },
  iconBack: {
    paddingLeft: 24,
    paddingRight: 20,
    marginRight: 79,
  },
});

export default memo(BackgroundCommon);
