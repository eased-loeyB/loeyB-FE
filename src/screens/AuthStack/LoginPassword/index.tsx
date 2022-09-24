import React, {FC, useMemo, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {LoeybErrorCode, useAuthenticateLazyQuery} from '~/apollo/generated';
import {saveToken} from '~/apollo/utils/auth';
import BackgroundCommon from '~/components/BackgroundCommon';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import {AuthStackParamList, AuthStackName} from '~/navigation/stacks/AuthStack';
import {getDeviceToken} from '~/services/notifications';
import {onLogin} from '~/store/reduxtoolkit/user/userSlice';
import {BottomWrapperStyle, SubtitleStyle, TitleStyle} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validateEmail, validatePassword} from '~/utils/Validate';

type Props = StackScreenProps<
  AuthStackParamList,
  AuthStackName.LOGIN_WITH_PASS
>;

const PageWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 24px;
  margin-top: 60px;
`;

const Title = styled.Text`
  ${TitleStyle}
  margin-top: 12px;
`;

const Subtitle = styled.Text`
  ${SubtitleStyle}
`;

const InputWrapper = styled.View`
  margin-top: 32px;
`;

const ButtonWrapper = styled.View`
  ${BottomWrapperStyle}
`;

const LoginWithPassword: FC<Props> = ({
  route: {
    params: {email: defaultEmail},
  },
}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');

  const isValidEmail = useMemo(
    () => validateEmail(email) && !isEmpty(email),
    [email],
  );
  const isValidPassword = useMemo(
    () => validatePassword(password) && !isEmpty(password),
    [password],
  );

  const [login, {loading}] = useAuthenticateLazyQuery({
    onCompleted: async ({authenticate: {data, result}}) => {
      if (data) {
        await saveToken(data);
        dispatch(onLogin(data));
        ToastService.showSuccess(`Welcome back ${email}`);
      } else if (result === LoeybErrorCode.PasswordIncorrect) {
        ToastService.showError('The email or password is incorrect');
      } else {
        ToastService.showError('Something went wrong. Please try again.');
      }
    },
    onError: () => {
      ToastService.showError('The email or password is incorrect');
    },
  });

  const canNext = isValidEmail && isValidPassword;

  return (
    <BackgroundCommon haveFilter={true} canGoBack={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PageWrapper>
          <Container>
            <Subtitle>Login</Subtitle>
            <Title>Input your password</Title>
            <InputWrapper>
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
            </InputWrapper>
            {isValidEmail && (
              <InputWrapper>
                <TextField
                  value={password}
                  onTextChange={value => setPassword(value)}
                  placeholder={'Password'}
                  errorMsg={
                    !isValidPassword && !isEmpty(password)
                      ? 'Not 8 characters yet'
                      : ''
                  }
                  secureTextEntry={true}
                />
              </InputWrapper>
            )}
          </Container>
          <ButtonWrapper>
            <Button
              title={'Login'}
              callback={async () => {
                const deviceToken = await getDeviceToken();
                login({
                  variables: {
                    email,
                    password,
                    deviceToken,
                  },
                });
              }}
              enable={canNext && !loading}
            />
          </ButtonWrapper>
        </PageWrapper>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

export default LoginWithPassword;
