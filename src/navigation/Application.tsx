import React, {useEffect} from 'react';
import {DeviceEventEmitter, StatusBar} from 'react-native';

// import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {useRefreshMutation} from '~/apollo/generated';
import {EventToken} from '~/apollo/types/event';
import {isSuccessResponse} from '~/apollo/utils/error';
import {RootState} from '~/store';
import {onLogout} from '~/store/reduxtoolkit/user/userSlice';
import {
  saveAccessToken,
  saveRefreshToken,
  saveExpiresIn,
  loadRefreshToken,
} from '~/utils/asyncstorage';
import {isIOS} from '~/utils/device';
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
  const {isLoggedIn, isLoginExpired} = useSelector(
    (state: RootState) => state.user.authData,
  );
  const dispatch = useDispatch();

  const [getRefreshToken] = useRefreshMutation({
    onCompleted: async ({refresh: {result, data}}) => {
      if (isSuccessResponse(result)) {
        await saveAccessToken(data?.accessToken);
        await saveRefreshToken(data?.refreshToken);
        await saveExpiresIn(`${data?.expiresIn}`);

        DeviceEventEmitter.emit(EventToken.UPDATE_TOKEN);
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

    const tokenExpiredEvent = DeviceEventEmitter.addListener(
      EventToken.TOKEN_EXPIRED,
      onRefreshToken,
    );

    const tokenInvalidEvent = DeviceEventEmitter.addListener(
      EventToken.INVALID_TOKEN,
      () => {
        dispatch(onLogout());
      },
    );

    return () => {
      tokenExpiredEvent.remove();
      tokenInvalidEvent.remove();
    };
  }, []);

  useEffect(() => {
    if (isLoginExpired) {
      ToastService.show({
        isError: false,
        message: 'login.loginExpired',
      });
    }
  }, [isLoginExpired]);

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
          {isLoggedIn ? (
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
