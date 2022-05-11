import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackgroundCommon from '../../../components/BackgroundCommon';
import TextField from '../../../components/text_field';
import {convertHeight, convertWidth, create} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/button';
import _ from 'lodash';
import {GOOGLE_LOGIN} from '../../../assets';
import {validateEmail} from '../../../utils/Validate';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {push} from '../../../navigation';
import {useGetData} from '../register/useGetData';

export const Login = () => {
  const [email, setEmail] = useState('');
  const isValidEmail = validateEmail(email);
  const {data, loading, error, requestCode, errorCode, getContentData} =
    useGetData({
      email: email,
    });

  useEffect(() => {
    const responseData = getContentData();
    if (responseData) {
      if (responseData.result === 'DUPLICATE_EMAIL') {
        push(NameScreenAuthStack.LOGIN_WITH_PASS, {
          email: email,
        });
      } else {
        push(NameScreenAuthStack.REGISTER, {
          email: email,
        });
      }
    }
  }, [data]);

  return (
    <BackgroundCommon haveFilter={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              marginTop: convertHeight(216),
              paddingHorizontal: convertWidth(24),
              flex: 1,
            }}>
            <Text style={{...CommonStyles.title}}>Welcome to loeyB</Text>
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
            <View style={{marginTop: 28}}>
              <Button
                title={'Continue'}
                callback={() => {
                  requestCode({
                    variables: {
                      email: email,
                    },
                  });
                }}
                enable={!_.isEmpty(email)}
              />
            </View>
          </View>
          <TouchableWithoutFeedback>
            <Image source={GOOGLE_LOGIN} />
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
