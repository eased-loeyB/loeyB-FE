import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';

import {isEmpty} from 'lodash';

import {onLogin} from '~/apollo/utils/auth';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
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

import {useRegisterUser} from '../hooks/useRegisterUser';

// @ts-ignore
export const RegisterWithPass = ({route}) => {
  const {email: paramEmail} = route?.params;
  const [email, setEmail] = useState(paramEmail ?? '');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const isValidEmail = validateEmail(email) && !isEmpty(email);
  const {registerUser, responseData} = useRegisterUser();

  const saveToken = async (responseData: any) => {
    await saveCustomerToken(responseData.data.accessToken);
    await saveRefreshToken(responseData.data.refreshToken);
    await saveExpiresIn(`${responseData.data.expiresIn}`);
    let token = await loadCustomerToken();

    if (token) {
      onLogin();
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
    !isEmpty(pass) &&
    pass.length >= 8 &&
    !isEmpty(rePass) &&
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
                  !isValidEmail && !isEmpty(email)
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
