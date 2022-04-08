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
import TextField from '../../../components/TextField';
import {convertHeight, convertWidth} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/Button';
import _ from 'lodash';
import {GOOGLE_LOGIN} from '../../../assets';
import {validateEmail, validatePassword} from '../../../utils/Validate';
import {navigate} from '../../../navigation';
import {NameScreenAuthStack} from '../../../navigation/stacks';

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
            <Text style={{...CommonStyles.subTitle, marginTop: 7}}>Create your password </Text>
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
                  navigate(NameScreenAuthStack.INPUT_NAME, {})
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
