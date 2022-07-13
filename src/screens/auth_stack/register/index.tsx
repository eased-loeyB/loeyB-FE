import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';

import {isEmpty} from 'lodash';

import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {convertHeight, convertWidth} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';
import {validateEmail} from '~/utils/Validate';

// @ts-ignore
export const Register = ({route}) => {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [code, setCode] = useState('');
  const isValidEmail = validateEmail(email) && !isEmpty(email);

  const isValidCode = !isEmpty(code);

  const canNext = isValidEmail && isValidCode;
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
              Verify your email
            </Text>
            <View style={{marginTop: convertHeight(46)}}>
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
                  value={code}
                  onTextChange={value => setCode(value)}
                  placeholder={'Code'}
                  errorMsg={
                    !isValidCode && !isEmpty(code) ? 'Not 6 characters yet' : ''
                  }
                />
              </View>
            )}
            <View style={{marginTop: 28}}>
              <Button
                title={'Verify'}
                callback={() => {
                  navigate(NameScreenAuthStack.REGISTER_WITH_PASS, {
                    email: email,
                    code: code,
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
