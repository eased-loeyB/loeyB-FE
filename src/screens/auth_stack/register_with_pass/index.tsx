import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {isEmpty} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

import {saveToken} from '~/apollo/utils/auth';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {useRegisterUser} from '~/hooks/api/useRegisterUser';
import {push} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {SubtitleStyle, TitleStyle} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validatePassword} from '~/utils/Validate';

const PageWrapper = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 60px;
`;

const Subtitle = styled.Text`
  ${SubtitleStyle}
`;

const Title = styled.Text`
  ${TitleStyle}
  margin-top: 12px;
`;

const EmailInputWrapper = styled.View`
  margin-top: 48px;
`;

const PasswordInputWrapper = styled.View`
  margin-top: 16px;
`;

const ButtonWrapper = styled.View`
  margin-top: 28px;
`;

// @ts-ignore
export const RegisterWithPass = ({route}) => {
  const email = route?.params?.email ?? '';
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const {registerUser, responseData} = useRegisterUser();

  useEffect(() => {
    if (responseData) {
      saveToken(responseData);
      ToastService.showSuccess('Welcome to loeyB');
      push(NameScreenAuthStack.INPUT_NAME, {});
    }
  }, [responseData]);

  const canNext =
    !isEmpty(pass) &&
    pass.length >= 8 &&
    !isEmpty(rePass) &&
    rePass.length >= 8;
  return (
    <BackgroundCommon haveFilter={true} canGoBack={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          extraHeight={36}
          extraScrollHeight={36}>
          <PageWrapper>
            <Subtitle>Sign up</Subtitle>
            <Title>Create your password</Title>
            <EmailInputWrapper>
              <TextField value={email} editable={false} />
            </EmailInputWrapper>
            <PasswordInputWrapper>
              <TextField
                value={pass}
                onTextChange={value => setPass(value)}
                placeholder={'More than 8 letters + numbers'}
                errorMsg={
                  !!pass && !validatePassword(pass)
                    ? 'password format is incorrect'
                    : ''
                }
              />
            </PasswordInputWrapper>
            <PasswordInputWrapper>
              <TextField
                value={rePass}
                onTextChange={value => setRePass(value)}
                placeholder={'Check password'}
              />
            </PasswordInputWrapper>
            <ButtonWrapper>
              <Button
                title={'Done'}
                callback={() => {
                  if (pass !== rePass) {
                    ToastService.showError('The passwords are different');
                  } else {
                    registerUser({
                      variables: {
                        email: email,
                        password: pass,
                      },
                    });
                  }
                }}
                enable={canNext}
              />
            </ButtonWrapper>
          </PageWrapper>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
