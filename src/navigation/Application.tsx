import React, {useEffect} from 'react';
import {DeviceEventEmitter, StatusBar} from 'react-native';

import {useMutation, useQuery} from '@apollo/client';
// import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {REFRESH_TOKEN} from '~/apollo/mutations/auth';
import {IsLoggedInDataType, IS_LOGGED_IN} from '~/apollo/queries/isLoggedIn';
import {isSuccessResponse} from '~/models/CommonResponse';
import {
  saveAccessToken,
  saveRefreshToken,
  saveExpiresIn,
  loadRefreshToken,
} from '~/utils/asyncstorage';
import {isIOS} from '~/utils/device';
import {UPDATE_TOKEN, TOKEN_EXPIRED} from '~/utils/Events';
import ToastService from '~/utils/ToastService';

import {navigationRef} from './Root';
import {AuthStack} from './stacks';

import {MainNavigator} from '.';

export const ApplicationStack = {
  MAIN: 'Main',
  AUTH: 'Auth',
};

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const {loading, data} = useQuery<IsLoggedInDataType>(IS_LOGGED_IN);

  const [getRefreshToken] = useMutation(REFRESH_TOKEN, {
    onCompleted: async res => {
      if (isSuccessResponse(res.refresh)) {
        await saveAccessToken(res.refresh.data.accessToken);
        await saveRefreshToken(res.refresh.data.refreshToken);
        await saveExpiresIn(`${res.refresh.data.expiresIn}`);

        DeviceEventEmitter.emit(UPDATE_TOKEN);
      }
    },
  });

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const onRefreshToken = async () => {
    const refreshToken = await loadRefreshToken();

    if (refreshToken) {
      await getRefreshToken({
        variables: {
          refreshToken,
        },
      });
    }
  };

  useEffect(() => {
    // always refersh accessToken in storage at every first launch
    onRefreshToken();

    /**
     * iOS only needs to request permission for FCM
     * @see https://rnfirebase.io/messaging/usage#ios---requesting-permissions
     */
    if (isIOS()) {
      requestUserPermission();
    }

    const event = DeviceEventEmitter.addListener(TOKEN_EXPIRED, onRefreshToken);

    return () => {
      event.remove();
    };
  }, []);

  useEffect(() => {
    if (data?.isLoginExpired) {
      ToastService.show({
        isError: false,
        message: 'login.loginExpired',
      });
    }
  }, [data?.isLoginExpired]);

  // notifee.onBackgroundEvent(async ({type, detail}) => {
  //   const {notification, pressAction} = detail;
  //   if (type === EventType.ACTION_PRESS) {
  //     console.log('User pressed the notification.', pressAction?.id);
  //   }
  // });

  // useEffect(() => {
  //   return notifee.onForegroundEvent(({type, detail}) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log('User pressed notification', detail.notification);
  //         break;
  //     }
  //   });
  // }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          barStyle={'light-content'}
          translucent={true}
          backgroundColor="transparent"
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!loading && data?.isLoggedIn ? (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          ) : (
            <Stack.Screen
              name={ApplicationStack.AUTH}
              component={AuthStack}
              options={{
                animationEnabled: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
