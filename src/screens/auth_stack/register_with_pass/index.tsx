import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';

import {isEmpty} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {saveToken} from '~/apollo/utils/auth';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {useRegisterUser} from '~/hooks/api/useRegisterUser';
import {push} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {convertHeight, convertWidth} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';
import ToastService from '~/utils/ToastService';
import {validatePassword} from '~/utils/Validate';

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
          contentContainerStyle={{flex: 1}}
          extraHeight={36}
          extraScrollHeight={36}>
          <View
            style={{
              marginTop: convertHeight(58),
              paddingHorizontal: convertWidth(24),
              flex: 1,
            }}>
            <Text style={CommonStyles.subTitle}>Sign up</Text>
            <Text style={{...CommonStyles.title, marginTop: 12}}>
              Create your password
            </Text>
            <View style={{marginTop: convertHeight(46)}}>
              <TextField value={email} editable={false} />
            </View>
            <View style={{marginTop: convertHeight(16)}}>
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
            </View>
            <View style={{marginTop: convertHeight(16)}}>
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
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
