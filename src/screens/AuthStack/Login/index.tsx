import React, {FC, useEffect, useMemo, useState} from 'react';
import {Alert, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';

import {useKeyboard} from '@react-native-community/hooks';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {
  useGoogleLoginMutation,
  useRequestEmailVerificationCodeMutation,
} from '~/apollo/generated';
import {GOOGLE_LOGIN} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import {
  AuthStackName,
  AuthStackNavigationProps,
} from '~/navigation/stacks/AuthStack';
import {onLogin} from '~/store/reduxtoolkit/user/userSlice';
import {SubtitleStyle, TitleStyle} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validateEmail} from '~/utils/Validate';

const PageWrapper = styled.View`
  flex: 1;
  padding: 0 16px;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 216px;
`;

const Title = styled.Text`
  ${TitleStyle}
`;

const Subtitle = styled.Text`
  ${SubtitleStyle}
  margin-top: 12px;
`;

const InputWrapper = styled.View`
  margin-top: 50px;
`;

const LoginButtonWrapper = styled.View`
  margin-top: 28px;
`;

const Login: FC = () => {
  const {push} = useNavigation<AuthStackNavigationProps>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const isValidEmail = useMemo(() => validateEmail(email), [email]);
  const keyboard = useKeyboard();

  const [requestCode] = useRequestEmailVerificationCodeMutation({
    onCompleted: ({requestEmailVerificationCode: {data, result}}) => {
      if (data) {
        ToastService.showSuccess('Please check your email');
        if (result === 'DUPLICATE_EMAIL') {
          push(AuthStackName.LOGIN_WITH_PASS, {
            email,
          });
        } else {
          push(AuthStackName.REGISTER, {
            email,
          });
        }
      }
    },
  });

  const [googleLogin] = useGoogleLoginMutation({
    onCompleted: async ({googleLogin: {data}}) => {
      if (data) {
        dispatch(onLogin(data));
        ToastService.showSuccess('Welcome back');
      }
    },
  });

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      iosClientId:
        '306679295015-c789drrfrqo9ump3p1e7ge6sihuqjbk4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId:
        '306679295015-0st1tna4koic7euj4h5ctt7ruu6q0lqg.apps.googleusercontent.com',
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
        <PageWrapper>
          <Container>
            <Title>Welcome to loeyB</Title>
            <Subtitle>Input your email to login or signup</Subtitle>
            <InputWrapper>
              <TextField
                value={email}
                onTextChange={value => setEmail(value)}
                placeholder={'Email'}
                errorMsg={
                  !!email && !isValidEmail ? 'Email format is incorrect' : ''
                }
              />
            </InputWrapper>
            <LoginButtonWrapper>
              <Button
                title={'Continue'}
                callback={() => {
                  requestCode({
                    variables: {
                      email: email,
                    },
                  });
                }}
                enable={!!email && isValidEmail}
              />
            </LoginButtonWrapper>
          </Container>
          {!keyboard.keyboardShown && (
            <TouchableWithoutFeedback onPress={signIn}>
              <Image source={GOOGLE_LOGIN} />
            </TouchableWithoutFeedback>
          )}
        </PageWrapper>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

export default Login;
