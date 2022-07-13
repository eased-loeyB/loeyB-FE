import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {useKeyboard} from '@react-native-community/hooks';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {isEmpty} from 'lodash';

import {getApolloClient} from '~/apollo/client';
import {IS_LOGGED_IN} from '~/apollo/queries/isLoggedIn';
import {GOOGLE_LOGIN} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {AuthData} from '~/models/Auth';
import {isSuccessResponse} from '~/models/CommonResponse';
import {push} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {convertHeight, convertWidth} from '~/utils/design';
import {
  loadCustomerToken,
  saveCustomerToken,
  saveExpiresIn,
  saveRefreshToken,
} from '~/utils/storage';
import {CommonStyles} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validateEmail} from '~/utils/Validate';

import {useGetData} from '../register/useGetData';
import {useGoogleLogin} from './hook/useGoogleLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const isValidEmail = validateEmail(email);
  const keyboard = useKeyboard();
  const {data, requestCode, getContentData} = useGetData({
    email: email,
  });

  const {request: googleLogin, responseData: resGoogleLogin} = useGoogleLogin();

  useEffect(() => {
    const responseData = getContentData();
    if (responseData) {
      if (responseData.result === 'DUPLICATE_EMAIL') {
        push(NameScreenAuthStack.LOGIN_WITH_PASS, {
          email: email,
        });
      } else {
        push(NameScreenAuthStack.REGISTER, {
          email: email,
        });
      }
    }
  }, [data]);

  const saveToken = async ({
    accessToken,
    refreshToken,
    expiresIn,
  }: AuthData) => {
    const client = await getApolloClient();
    await saveCustomerToken(accessToken);
    await saveRefreshToken(refreshToken);
    await saveExpiresIn(`${expiresIn}`);
    let token = await loadCustomerToken();

    if (token) {
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
          isLoginExpired: false,
        },
      });
    }
    ToastService.showSuccess('Welcome back');
  };

  useEffect(() => {
    // const responseData = getContentData();
    if (resGoogleLogin) {
      if (isSuccessResponse(resGoogleLogin)) {
        saveToken(resGoogleLogin.data);
      }
    }
  }, [resGoogleLogin]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      iosClientId:
        '322865048963-tuq93lhan6395vnfr2ukpihum7qv2qp7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId:
        '322865048963-j669ueha4prbomsg2d1u1ag0uknceen0.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.getTokens();
      console.log('Respsone from google: => ', currentUser);
      googleLogin({
        variables: {
          token: currentUser.accessToken,
        },
      });
      // this.setState({ userInfo });
    } catch (error: any) {
      Alert.alert('', 'Some things went wrong.');
      console.log(error ? JSON.stringify(error) : error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <BackgroundCommon haveFilter={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              marginTop: convertHeight(216),
              paddingHorizontal: convertWidth(24),
              flex: 1,
            }}>
            <Text style={{...CommonStyles.title}}>Welcome to loeyB</Text>
            <Text style={{...CommonStyles.subTitle, marginTop: 12}}>
              Input your email to login or signup
            </Text>
            <View style={{marginTop: convertHeight(50)}}>
              <TextField
                value={email}
                onTextChange={value => setEmail(value)}
                placeholder={'Email'}
                errorMsg={
                  !isValidEmail && !isEmpty(email)
                    ? 'Email format is incorrect'
                    : ''
                }
              />
            </View>
            <View style={{marginTop: 28}}>
              <Button
                title={'Continue'}
                callback={() => {
                  requestCode({
                    variables: {
                      email: email,
                    },
                  });
                }}
                enable={!isEmpty(email)}
              />
            </View>
          </View>
          {!keyboard.keyboardShown && (
            <TouchableWithoutFeedback onPress={signIn}>
              <Image source={GOOGLE_LOGIN} />
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
