import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import BackgroundCommon from '../../../components/BackgroundCommon';
import TextField from '../../../components/text_field';
import {convertHeight, convertWidth} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/button';
import _ from 'lodash';
import {validateEmail} from '../../../utils/Validate';
import {navigate} from '../../../navigation';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {useMutation} from '@apollo/client';
import {REQUEST_REGISTER_CODE} from '../../../apollo/mutations/auth';
import {useGetData} from './useGetData';

// @ts-ignore
export const Register = ({route}) => {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [code, setCode] = useState('');
  const isValidEmail = validateEmail(email) && !_.isEmpty(email);

  const isValidCode = !_.isEmpty(code);

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
              What is your email?{' '}
            </Text>
            <View style={{marginTop: convertHeight(46)}}>
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
                  value={code}
                  onTextChange={value => setCode(value)}
                  placeholder={'Code'}
                  errorMsg={
                    !isValidCode && !_.isEmpty(code)
                      ? 'Not 6 characters yet'
                      : ''
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
