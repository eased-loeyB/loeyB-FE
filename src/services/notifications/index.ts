import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const initFCM = async () => {
  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
  const havePermission = await haveNotificationPermission();
  if (havePermission) {
    PushNotification.configure({
      onRegister: function (token: object) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification: any) {
        console.log('onNotification NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification: any) {
        console.log('onAction ACTION:', notification.action);
        console.log('onAction NOTIFICATION:', notification);
      },

      onRegistrationError: function (err: any) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
};

async function haveNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

export async function getDeviceToken() {
  let token = await messaging().getToken();
  return token;
}
