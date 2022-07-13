import {StyleSheet} from 'react-native';

import {Fonts} from '~/assets';
import {CommonColors, ErrorColors} from '~/utils/Colors';
import {convertFontSize} from '~/utils/design';

export const MainStyles = StyleSheet.create({
  tabBarBadgeStyle: {
    backgroundColor: ErrorColors.Base,
    fontFamily: Fonts.Medium,
    fontSize: convertFontSize(11),
    color: CommonColors.White,
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
  },
  dotIcon: {
    width: 4,
    height: 4,
    backgroundColor: ErrorColors.Base_2,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 45,
  },
  badgeStyle: {
    backgroundColor: ErrorColors.Base_2,
    color: CommonColors.White,
    fontSize: convertFontSize(11),
    fontFamily: Fonts.Medium,
    fontWeight: '500',
  },
});
