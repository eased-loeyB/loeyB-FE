import {Platform} from 'react-native';

export const isAndroid = () => {
  return Platform.OS === 'android';
};

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const getOSVer = () => {
  // @ts-ignore
  return Platform.constants.Release;
};

export const isAndroid11orHigher = () => {
  try {
    const osVer = getOSVer();
    if (isAndroid() && parseInt(osVer) >= 11) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
