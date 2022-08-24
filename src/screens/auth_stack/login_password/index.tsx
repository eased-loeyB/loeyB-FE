import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import {isEmpty} from 'lodash';
import styled from 'styled-components/native';

import {useAuthenticateLazyQuery} from '~/apollo/generated';
import {saveToken} from '~/apollo/utils/auth';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {getDeviceToken} from '~/services/notifications';
import {TitleStyle} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validateEmail, validatePassword} from '~/utils/Validate';

const PageWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 60px;
`;

const Title = styled.Text`
  ${TitleStyle}
`;

const EmailInputWrapper = styled.View`
  margin-top: 66px;
`;

const PasswordInputWrapper = styled.View`
  margin-top: 12px;
`;

const ButtonWrapper = styled.View`
  margin-top: 28px;
`;

// @ts-ignore
export const LoginWithPassword = ({route}) => {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [password, setPassword] = useState('');
  const isValidEmail = validateEmail(email) && !isEmpty(email);
  const isValidPassword = validatePassword(password) && !isEmpty(password);

  const [login] = useAuthenticateLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: async ({authenticate}) => {
      if (authenticate.data) {
        await saveToken(authenticate.data);
      }
      ToastService.showSuccess(`Welcome back ${email}`);
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
            <Title>Login</Title>
            <EmailInputWrapper>
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
            </EmailInputWrapper>
            {isValidEmail && (
              <PasswordInputWrapper>
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
              </PasswordInputWrapper>
            )}
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
                enable={canNext}
              />
            </ButtonWrapper>
          </Container>
        </PageWrapper>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
