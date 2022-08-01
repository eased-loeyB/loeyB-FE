import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';

import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {convertHeight, convertWidth} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';

// @ts-ignore
export const Register = ({route}) => {
  const email = route?.params?.email ?? '';
  const [code, setCode] = useState('');

  const isValidCode = code.length === 6;

  const canNext = isValidCode;
  return (
    <BackgroundCommon haveFilter={true} canGoBack={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            marginTop: convertHeight(58),
            paddingHorizontal: convertWidth(16),
            flex: 1,
          }}>
          <Text style={CommonStyles.subTitle}>Sign up</Text>
          <Text style={{...CommonStyles.title, marginTop: 12}}>
            Verify your email
          </Text>
          <View style={{marginTop: convertHeight(46)}}>
            <TextField value={email} editable={false} />
          </View>
          <View style={{marginTop: convertHeight(10)}}>
            <TextField
              value={code}
              onTextChange={value => setCode(value)}
              placeholder={'Code'}
              errorMsg={!!code && !isValidCode ? 'Not 6 characters yet' : ''}
            />
          </View>
          <View style={{marginTop: 28}}>
            <Button
              title={'Verify'}
              callback={() => {
                navigate(NameScreenAuthStack.REGISTER_WITH_PASS, {
                  email,
                  code,
                });
              }}
              enable={canNext}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
