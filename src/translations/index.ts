import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import * as resources from './resources';

export let deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

if (!Platform.isTesting && deviceLanguage === 'vi_VN') {
  deviceLanguage = 'en_EN';
}

i18n.use(initReactI18next).init({
  fallbackLng: 'ko',
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {},
    ),
  },
  lng: deviceLanguage.substring(0, 2),
});

export default i18n;
