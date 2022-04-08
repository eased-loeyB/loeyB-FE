import {LightBlue2} from './Colors';
import {convertFontSize} from './design';
import {StyleProp} from 'react-native';

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
  }
};
