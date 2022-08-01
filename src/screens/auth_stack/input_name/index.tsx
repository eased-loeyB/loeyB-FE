import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {isEmpty} from 'lodash';
import {rgba} from 'polished';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';

import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {useSetName} from '~/hooks/api/useSetName';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {LightBlue, LightBlue2} from '~/utils/Colors';
import {convertFontSize, convertHeight, convertWidth} from '~/utils/design';
import {CommonStyles} from '~/utils/Styles';

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
        <View style={CommonStyles.flexCenter}>
          <View style={{position: 'absolute', top: convertHeight(80)}}>
            <Text style={styles.title}>Hi</Text>
            <Text style={styles.title}>What is your name?</Text>
          </View>
          <View style={CommonStyles.flexCenter}>
            <View
              style={{
                ...styles.circle,
                width: convertWidth(232),
                height: convertHeight(232),
                borderWidth: convertWidth(16),
                borderColor: rgba(LightBlue, 0.12),
              }}
            />
            <View
              style={{
                ...styles.circle,
                width: convertWidth(200),
                height: convertHeight(200),
                borderWidth: convertWidth(12),
                borderColor: rgba(LightBlue, 0.3),
              }}
            />
            <RadialGradient
              style={{
                ...CommonStyles.flexCenter,
                ...styles.circle,
                width: convertWidth(176),
                height: convertHeight(176),
                overflow: 'hidden',
                backgroundColor: LightBlue,
              }}
              colors={[rgba(LightBlue2, 0), rgba(LightBlue2, 1)]}
              center={[convertWidth(88), convertHeight(88)]}
              radius={convertWidth(176)}>
              <TextField
                containerStyle={{
                  width: convertWidth(140),
                  height: convertHeight(36),
                  backgroundColor: 'transparent',
                }}
                value={name}
                onTextChange={value => setName(value)}
                placeholder={'Write your name'}
                maxLength={30}
                customWrapperContainer={{
                  borderBottomColor: 'black',
                  borderWidth: 0,
                  borderBottomWidth: 1,
                }}
                customTextInputStyle={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: convertFontSize(12),
                }}
                errorMsg={
                  !isValidName && !isEmpty(name) ? 'Invalid name format' : ''
                }
              />
            </RadialGradient>
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

const styles = StyleSheet.create({
  title: {
    ...CommonStyles.title,
    textAlign: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 9999,
  },
});
