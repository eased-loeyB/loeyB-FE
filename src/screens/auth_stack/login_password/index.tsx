import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';

import {useLazyQuery} from '@apollo/client';
import {isEmpty} from 'lodash';

import {AUTHENTICATE} from '~/apollo/queries/auth';
import {saveToken} from '~/apollo/utils/auth';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {AuthResponse} from '~/models/Auth';
import {isSuccessResponse} from '~/models/CommonResponse';
import {getDeviceToken} from '~/services/notifications';
import {convertHeight, convertWidth} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validateEmail, validatePassword} from '~/utils/Validate';

// @ts-ignore
export const LoginWithPassword = ({route}) => {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [password, setPassword] = useState('');
  const isValidEmail = validateEmail(email) && !isEmpty(email);
  const isValidPassword = validatePassword(password) && !isEmpty(password);

  const [login] = useLazyQuery<{
    authenticate: AuthResponse;
  }>(AUTHENTICATE, {
    onCompleted: async res => {
      if (isSuccessResponse(res.authenticate)) {
        saveToken(res.authenticate.data);
        ToastService.showSuccess(`Welcome back ${email}`);
      } else {
        ToastService.showError('The email or password is incorrect');
      }
    },
    onError: () => {
      ToastService.showError('The email or password is incorrect');
    },
    fetchPolicy: 'no-cache',
  });

  const canNext = isValidEmail && isValidPassword;
  return (
    <BackgroundCommon haveFilter={true} canGoBack={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              marginTop: convertHeight(58),
              paddingHorizontal: convertWidth(24),
              flex: 1,
            }}>
            <Text style={{...CommonStyles.title}}>Login</Text>
            <View style={{marginTop: convertHeight(66)}}>
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
            {isValidEmail && (
              <View style={{marginTop: convertHeight(10)}}>
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
              </View>
            )}
            <View style={{marginTop: 28}}>
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
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
