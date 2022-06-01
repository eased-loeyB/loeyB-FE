import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import BackgroundCommon from '../../../components/BackgroundCommon';
import TextField from '../../../components/text_field';
import {
  convertHeight,
  convertWidth,
  saveExpiresIn,
  saveRefreshToken,
} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/button';
import _ from 'lodash';
import {validateEmail} from '../../../utils/Validate';
import {navigate, push} from '../../../navigation';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {useRegisterUser} from '../hooks/useRegisterUser';
import ToastService from '../../../utils/ToastService';
import {isSuccessResponse} from '../../../models/CommonResponse';
import {getApolloClient} from '../../../apollo/client';
import {loadCustomerToken, saveCustomerToken} from '../../../utils/storage';
import {IS_LOGGED_IN} from '../../../apollo/queries/isLoggedIn';

// @ts-ignore
export const RegisterWithPass = ({route}) => {
  const {email: paramEmail, code} = route?.params;
  const [email, setEmail] = useState(paramEmail ?? '');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const isValidEmail = validateEmail(email) && !_.isEmpty(email);
  const {registerUser, data, loading, error, errorCode, responseData} =
    useRegisterUser();

  const saveToken = async (responseData: any) => {
    const client = await getApolloClient();
    await saveCustomerToken(responseData.data.accessToken);
    await saveRefreshToken(responseData.data.refreshToken);
    await saveExpiresIn(`${responseData.data.expiresIn}`);
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
  };

  useEffect(() => {
    if (responseData) {
      console.log(responseData);
      if (isSuccessResponse(responseData)) {
        saveToken(responseData);
        ToastService.showSuccess('Welcome to loeyB');
        push(NameScreenAuthStack.INPUT_NAME, {});
      }
    }
  }, [responseData]);

  const canNext =
    !_.isEmpty(pass) &&
    pass.length >= 8 &&
    !_.isEmpty(rePass) &&
    rePass.length >= 8;
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
            <Text style={{...CommonStyles.title}}>Sign up</Text>
            <Text style={{...CommonStyles.subTitle, marginTop: 7}}>
              Create your password
            </Text>
            <View style={{marginTop: convertHeight(46)}}>
              <TextField
                value={email}
                onTextChange={value => setEmail(value)}
                editable={false}
                placeholder={'Email'}
                customTextInputStyle={{color: '#A7DAF6'}}
                errorMsg={
                  !isValidEmail && !_.isEmpty(email)
                    ? 'Email format is incorrect'
                    : ''
                }
              />
            </View>
            <View style={{marginTop: convertHeight(10)}}>
              <TextField
                value={pass}
                onTextChange={value => setPass(value)}
                placeholder={'More than 8 letters + numbers'}
              />
            </View>
            <View style={{marginTop: convertHeight(10)}}>
              <TextField
                value={rePass}
                onTextChange={value => setRePass(value)}
                placeholder={'Check password'}
              />
            </View>
            <View style={{marginTop: 28}}>
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
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
