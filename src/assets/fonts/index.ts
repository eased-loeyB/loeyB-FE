import {Platform} from 'react-native';

export default {
  Regular:
    Platform.OS === 'ios' ? 'NotoSansKR-Regular' : 'SpoqaHanSansNeo-Regular',
  Medium:
    Platform.OS === 'ios' ? 'NotoSansKR-Medium' : 'SpoqaHanSansNeo-Medium',
  Bold: Platform.OS === 'ios' ? 'NotoSansKR-Bold' : 'SpoqaHanSansNeo-Bold',
};
