import React, {createRef, FC, useEffect, useMemo, useState} from 'react';
import {DeviceEventEmitter, StatusBar} from 'react-native';

// import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {
  CompositeNavigationProp,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {
  useFetchRegisteredAreaAndCategoryAndTagLazyQuery,
  useFetchRegisteredRecordsLazyQuery,
  useRefreshMutation,
} from '~/apollo/generated';
import {EventToken} from '~/apollo/types/event';
import {removeToken, saveToken} from '~/apollo/utils/auth';
import {isSuccessResponse} from '~/apollo/utils/error';
import Splash from '~/screens/Splash';
import {useTypedSelector} from '~/store';
import {
  onLogin,
  onLogout,
  resetData,
  updateUserData,
} from '~/store/reduxtoolkit/user/userSlice';
import {loadRefreshToken} from '~/utils/asyncstorage';
import {isIOS} from '~/utils/device';
import ToastService from '~/utils/ToastService';

import AuthStack, {AuthStackNavigationProps} from './stacks/AuthStack';
import MainStack, {MainStackNavigationProps} from './stacks/MainStack';

export enum ApplicationStackName {
  SPLASH = 'SPLASH',
  MAIN = 'MAIN',
  AUTH = 'AUTH',
}

export const navigationRef = createRef<NavigationContainerRef<any>>();

export type ApplicationStackNavigationProps = CompositeNavigationProp<
  StackNavigationProp<Record<ApplicationStackName, undefined>>,
  CompositeNavigationProp<MainStackNavigationProps, AuthStackNavigationProps>
>;

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator: FC = () => {
  const {
    authData: {isLoggedIn, isLoginExpired},
    userData: {userName, areaAndCategoryAndTags, stardustRecords},
  } = useTypedSelector(({user}) => user);
  const dispatch = useDispatch();

  const [showSplash, setShowSplash] = useState<boolean>(true);

  const [requestRefreshToken] = useRefreshMutation({
    onCompleted: async ({refresh: {result, data}}) => {
      if (isSuccessResponse(result)) {
        if (data) {
          await saveToken(data);
          dispatch(onLogin(data));
          await fetchCategoryAndTag();
          await fetchRecords();
        } else {
          dispatch(resetData());
        }

        DeviceEventEmitter.emit(EventToken.UPDATE_TOKEN);
      }
    },
  });

  const [fetchCategoryAndTag] =
    useFetchRegisteredAreaAndCategoryAndTagLazyQuery({
      onCompleted: ({fetchRegisteredAreaAndCategoryAndTag: {data, result}}) => {
        if (isSuccessResponse(result)) {
          if (data) {
            dispatch(
              updateUserData({
                areaAndCategoryAndTags: data,
              }),
            );
          }
        }
      },
    });

  const [fetchRecords] = useFetchRegisteredRecordsLazyQuery({
    onCompleted: ({fetchRegisteredRecords: {data, result}}) => {
      if (isSuccessResponse(result)) {
        if (data) {
          dispatch(
            updateUserData({
              stardustRecords: data,
            }),
          );
        }
      }
    },
  });

  const hasUserData = useMemo(
    () =>
      !!userName &&
      areaAndCategoryAndTags.length > 0 &&
      stardustRecords.length > 0,
    [userName, areaAndCategoryAndTags, stardustRecords],
  );

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
      await requestRefreshToken({
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
      async () => {
        await removeToken();
        dispatch(onLogout());
      },
    );

    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      tokenExpiredEvent.remove();
      tokenInvalidEvent.remove();

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {showSplash && (
            <Stack.Screen
              name={ApplicationStackName.SPLASH}
              component={Splash}
            />
          )}

          {isLoggedIn ? (
            <Stack.Screen
              name={ApplicationStackName.MAIN}
              component={MainStack}
              options={{
                animationEnabled: false,
              }}
            />
          ) : !hasUserData ? (
            <Stack.Screen
              name={ApplicationStackName.AUTH}
              component={AuthStack}
              options={{
                animationEnabled: false,
              }}
            />
          ) : (
            // TODO: add real main page
            <Stack.Screen
              name={ApplicationStackName.AUTH}
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
