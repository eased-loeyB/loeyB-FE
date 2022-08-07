import {Platform, StyleSheet} from 'react-native';

import {SafeAreaProviderCompat} from '@react-navigation/elements';
import {EdgeInsets} from 'react-native-safe-area-context';

import {Fonts} from '~/assets';
import {ColorMap} from '~/utils/Colors';
import {convertFontSize} from '~/utils/design';

const getPaddingBottom = (insets: EdgeInsets) => {
  if (Platform.OS === 'android') {
    return 0;
  }
  return Math.max(insets.bottom - Platform.select({ios: 4, default: 0}), 0);
};

export const MainStyles = StyleSheet.create({
  tabBarBadgeStyle: {
    backgroundColor: ColorMap.ErrorBase,
    fontFamily: Fonts.Medium,
    fontSize: convertFontSize(11),
    color: ColorMap.White,
    letterSpacing: -0.1,
  },
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    shadowOpacity: 0,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'transparent',
    shadowRadius: 0,
    elevation: 0,
    paddingBottom: getPaddingBottom(
      SafeAreaProviderCompat.initialMetrics.insets,
    ),
  },
  dotIcon: {
    width: 4,
    height: 4,
    backgroundColor: ColorMap.ErrorBase02,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 45,
  },
  badgeStyle: {
    backgroundColor: ColorMap.ErrorBase02,
    color: ColorMap.White,
    fontSize: convertFontSize(11),
    fontFamily: Fonts.Medium,
    fontWeight: '500',
  },
});
