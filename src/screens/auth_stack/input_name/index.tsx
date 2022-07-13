import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {isEmpty} from 'lodash';

import {BACKGROUND_INPUT_NAME} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {
  convertHeight,
  convertWidth,
  deviceHeight,
  deviceWidth,
} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';

import {useSetName} from '../hooks/useSetName';

export const InputName = () => {
  const [name, setName] = useState('');
  const isValidName = !isEmpty(name) && name.length < 31;

  const {responseData, errorCode} = useSetName();

  useEffect(() => {
    if (responseData) {
      // if (isSuccessResponse(responseData)) {
      //   navigate(NameScreenAuthStack.SELECT_CATEGORY, {userName: name});
      // }
    }
  }, [responseData, errorCode]);
  return (
    <BackgroundCommon haveFilter={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              top: deviceHeight / 2 - 170,
              left: deviceWidth / 2 - 114,
            }}>
            <Image source={BACKGROUND_INPUT_NAME} />
          </View>
          <View
            style={{
              marginTop: convertHeight(140),
              paddingHorizontal: convertWidth(24),
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{...CommonStyles.title}}>Hi</Text>
            <Text
              style={{...CommonStyles.title, marginTop: 7, marginBottom: 50}}>
              What is your name?
            </Text>
            <View
              style={{
                marginTop: convertHeight(66),
                minWidth: convertWidth(150),
              }}>
              <TextField
                value={name}
                onTextChange={value => setName(value)}
                placeholder={'Write your name'}
                maxLength={30}
                customWrapperContainer={{
                  borderBottomColor: 'black',
                  borderWidth: 0,
                  borderBottomWidth: 1,
                }}
                customTextInputStyle={{color: 'black', textAlign: 'center'}}
                errorMsg={
                  !isValidName && !isEmpty(name) ? 'Invalid name format' : ''
                }
              />
            </View>
          </View>
          <View style={{marginTop: 28}}>
            <Button
              title={'Next'}
              callback={() => {
                navigate(NameScreenAuthStack.SELECT_CATEGORY, {userName: name});
                // requestSetName({
                //   variables: {
                //     username: name,
                //   },
                // });
              }}
              enable={isValidName}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
