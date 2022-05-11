import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackgroundCommon from '../../../components/BackgroundCommon';
import {
  convertHeight,
  convertWidth,
  deviceHeight,
  deviceWidth,
} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/button';
import {BACKGROUND_INPUT_NAME, BACKGROUND_WELCOME} from '../../../assets';
import {push} from '../../../navigation';
import {MainStackName} from '../../../navigation/stacks/MainStack';
// @ts-ignore
export const Welcome = ({route}) => {
  const {userName} = route?.params;

  return (
    <BackgroundCommon
      haveFilter={true}
      canGoBack={true}
      title={''}
      filterBG={BACKGROUND_WELCOME}
      customFiler={{top: 150}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                position: 'absolute',
                top: deviceHeight / 2 - convertWidth(250),
                left: deviceWidth / 2 - convertWidth(190),
              }}>
              <Image
                source={BACKGROUND_INPUT_NAME}
                style={{width: convertWidth(153), aspectRatio: 1}}
              />
            </View>
            <View style={styles.container}>
              <Text
                style={{
                  ...CommonStyles.title,
                  textAlign: 'center',
                }}>
                Welcome to loeyB
                {`\n ${userName}`}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 28}}>
            <Button
              title={'Next'}
              callback={() => {
                push(MainStackName.FIRST_MEMORY, {});
              }}
              enable={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  subTitle: {
    ...CommonStyles.subTitle,
    marginTop: convertHeight(17),
    textAlign: 'center',
  },
});
