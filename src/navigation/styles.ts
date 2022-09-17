import {Platform, StyleSheet} from 'react-native';

import {SafeAreaProviderCompat} from '@react-navigation/elements';
import {EdgeInsets} from 'react-native-safe-area-context';

const getPaddingBottom = (insets: EdgeInsets) => {
  if (Platform.OS === 'android') {
    return 0;
  }
  return Math.max(insets.bottom - Platform.select({ios: 4, default: 0}), 0);
};

export const MainStyles = StyleSheet.create({
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
});
