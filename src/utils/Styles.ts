import {StyleProp} from 'react-native';

import {LightBlue2} from './Colors';
import {convertFontSize} from './design';

export const CommonStyles: StyleProp<any> = {
  title: {
    color: LightBlue2,
    fontWeight: '600',
    fontSize: convertFontSize(28),
  },
  subTitle: {
    color: LightBlue2,
    fontWeight: '400',
    fontSize: convertFontSize(14),
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
