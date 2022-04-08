import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackgroundCommon from '../../../components/BackgroundCommon';
import TextField from '../../../components/TextField';
import {convertHeight, convertWidth} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/Button';
import _ from 'lodash';
import {GOOGLE_LOGIN} from '../../../assets';
import {validateEmail} from '../../../utils/Validate';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {push} from '../../../navigation';

export const Login = () => {
  const [email, setEmail] = useState('');
  const isValidEmail = validateEmail(email);
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
                  push(NameScreenAuthStack.LOGIN_WITH_PASS, {
                    email: email,
                  });
                }}
                enable={!_.isEmpty(email)}
              />
            </View>
            <View style={{marginTop: 28}}>
              <Button
                title={'REGISTER'}
                callback={() => {
                  push(NameScreenAuthStack.REGISTER, {
                    email: email,
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
