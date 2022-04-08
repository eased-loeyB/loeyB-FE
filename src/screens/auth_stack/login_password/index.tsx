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

// @ts-ignore
export const LoginWithPassword = ({route}) => {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [password, setPassword] = useState('');
  const isValidEmail = validateEmail(email) && !_.isEmpty(email);
  const isValidPassword = validatePassword(password) && !_.isEmpty(password);

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
                  Alert.alert('Logined');
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
