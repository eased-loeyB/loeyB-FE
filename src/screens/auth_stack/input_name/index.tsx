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
import {
  convertHeight,
  convertWidth,
  deviceHeight,
  deviceWidth,
} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/Button';
import _ from 'lodash';
import {BACKGROUND_INPUT_NAME, GOOGLE_LOGIN} from '../../../assets';
import {validateEmail} from '../../../utils/Validate';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {push} from '../../../navigation';

export const InputName = () => {
  const [name, setName] = useState('');
  const isValidName = !_.isEmpty(name) && name.length < 31;
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
                customTextInputStyle={{color: 'black'}}
                errorMsg={
                  !isValidName && !_.isEmpty(name) ? 'Invalid name format' : ''
                }
              />
            </View>
          </View>
          <View style={{marginTop: 28}}>
            <Button
              title={'Next'}
              callback={() => {
                Alert.alert('Done', 'Done');
              }}
              enable={isValidName}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
