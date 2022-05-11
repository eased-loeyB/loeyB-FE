//import {REFRESH_TOKEN} from '../apollo/mutations/auth';
import {IsLoggedInDataType, IS_LOGGED_IN} from '../apollo/queries/isLoggedIn';
//import {isSuccessResponse} from '../models/CommonResponse';
import {MainNavigator} from './index';
import {navigationRef} from './Root';
import {AuthStack} from './stacks/index';
// import {
//   loadRefreshToken,
//   removeAccessToken,
//   saveAccessToken,
//   saveExpiresIn,
//   saveRefreshToken,
//   TOKEN_EXPIRED,
//   UPDATE_TOKEN,
// } from '../utils';
//import ToastService from '../utils/ToastService';
//import {useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useQuery} from '@apollo/client';
//import {getApolloClient} from '../apollo/client';

export const ApplicationStack = {
  MAIN: 'Main',
  AUTH: 'Auth',
};

// export let commonToastRef = Toast
const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const { loading, data } = useQuery<IsLoggedInDataType>(IS_LOGGED_IN)
  // const [getRefreshToken] = useMutation(REFRESH_TOKEN, {
  //   onCompleted: async res => {
  //     if (isSuccessResponse(res.refresh)) {
  //       await saveAccessToken(res.refresh.data.accessToken);
  //       await saveRefreshToken(res.refresh.data.refreshToken);
  //       await saveExpiresIn(`${res.refresh.data.expiresIn}`);

  //       DeviceEventEmitter.emit(UPDATE_TOKEN);
  //     } else {
  //       await removeAccessToken();
  //       const client = await getApolloClient();
  //       await client.resetStore();
  //     }
  //   },
  // });

  // useEffect(() => {
  //   const event = DeviceEventEmitter.addListener(TOKEN_EXPIRED, async () => {
  //     const refreshToken = await loadRefreshToken();
  //     getRefreshToken({
  //       variables: {
  //         refreshToken,
  //       },
  //     });
  //   });
  //
  //   return () => {
  //     event.remove();
  //   };
  // }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  // useEffect(() => {
  //   if (data?.isLoginExpired) {
  //     ToastService.show({
  //       isError: false,
  //       message: 'login.loginExpired',
  //     });
  //   }
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
