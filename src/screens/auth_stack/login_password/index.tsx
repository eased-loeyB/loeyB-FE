import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackgroundCommon from '../../../components/BackgroundCommon';
import TextField from '../../../components/text_field';
import {convertHeight, convertWidth} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/button';
import _ from 'lodash';
import {GOOGLE_LOGIN} from '../../../assets';
import {validateEmail, validatePassword} from '../../../utils/Validate';
import {useLazyQuery} from '@apollo/client';
import {AUTHENTICATE} from '../../../apollo/queries/auth';
import Toast from 'react-native-toast-message';
import ToastService from '../../../utils/ToastService';
import {AuthResponse} from '../../../models/Auth';
import {isSuccessResponse} from '../../../models/CommonResponse';
import {push} from '../../../navigation';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {getApolloClient} from '../../../apollo/client';
import {
  loadCustomerToken,
  saveCustomerToken,
  saveExpiresIn,
  saveRefreshToken,
} from '../../../utils/storage';
import {IS_LOGGED_IN} from '../../../apollo/queries/isLoggedIn';

// @ts-ignore
export const LoginWithPassword = ({route}) => {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [password, setPassword] = useState('');
  const isValidEmail = validateEmail(email) && !_.isEmpty(email);
  const isValidPassword = validatePassword(password) && !_.isEmpty(password);

  const [login, {loading, error, data}] = useLazyQuery<{
    authenticate: AuthResponse;
  }>(AUTHENTICATE, {
    onCompleted: async res => {
      if (isSuccessResponse(res.authenticate)) {
        const client = await getApolloClient();
        await saveCustomerToken(res.authenticate.data.accessToken);
        await saveRefreshToken(res.authenticate.data.refreshToken);
        await saveExpiresIn(`${res.authenticate.data.expiresIn}`);
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
                  !isValidEmail && !_.isEmpty(email)
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
                    !isValidPassword && !_.isEmpty(password)
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
                callback={() => {
                  login({
                    variables: {
                      email: email,
                      password: password,
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
