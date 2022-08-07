import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {isEmpty} from 'lodash';
import {rgba} from 'polished';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import styled, {css} from 'styled-components/native';

import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {useSetName} from '~/hooks/api/useSetName';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {ColorMap} from '~/utils/Colors';
import {convertFontSize, convertHeight, convertWidth} from '~/utils/design';
import {ContainerStyle, TitleStyle} from '~/utils/Styles';

const Container = styled.View`
  ${ContainerStyle}
`;

const TitleWrapper = styled.View`
  position: absolute;
  top: 80px;
`;

const Title = styled.Text`
  ${TitleStyle}
  text-align: center;
`;

const CircleStyle = css`
  position: absolute;
  background-color: transparent;
  border-radius: 9999px;
`;

const FirstCircle = styled.View`
  ${CircleStyle}
  width: 232px;
  height: 232px;
  border-width: 16px;
  border-color: ${rgba(ColorMap.LightBlue, 0.12)};
`;

const SecondCircle = styled.View`
  ${CircleStyle}
  width: 200;
  height: 200px;
  border-width: 12px;
  border-color: ${rgba(ColorMap.LightBlue, 0.3)};
`;

const InnerCircle = styled(RadialGradient)`
  ${ContainerStyle}
  ${CircleStyle}
  width: 176px;
  height: 176px;
  overflow: hidden;
  background-color: ${ColorMap.LightBlue};
`;

const ButtonWrapper = styled.View`
  margin-top: 28px;
`;

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
        <Container>
          <TitleWrapper>
            <Title>Hi</Title>
            <Title>What is your name?</Title>
          </TitleWrapper>
          <Container>
            <FirstCircle />
            <SecondCircle />
            <InnerCircle
              colors={[
                rgba(ColorMap.LightBlue2, 0),
                rgba(ColorMap.LightBlue2, 1),
              ]}
              center={[convertWidth(88), convertHeight(88)]}
              radius={convertWidth(176)}>
              <TextField
                value={name}
                onTextChange={value => setName(value)}
                placeholder={'Write your name'}
                maxLength={30}
                containerStyle={styles.textFieldContainer}
                customWrapperContainer={styles.textFieldWrapper}
                customTextInputStyle={styles.textInput}
                errorMsg={
                  !isValidName && !isEmpty(name) ? 'Invalid name format' : ''
                }
              />
            </InnerCircle>
          </Container>
          <ButtonWrapper>
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
          </ButtonWrapper>
        </Container>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

const styles = StyleSheet.create({
  textFieldWrapper: {
    borderWidth: 0,
    borderBottomColor: ColorMap.Black,
    borderBottomWidth: 1,
  },
  textFieldContainer: {
    width: convertWidth(140),
    height: convertHeight(36),
    backgroundColor: 'transparent',
  },
  textInput: {
    color: ColorMap.Black,
    textAlign: 'center',
    fontSize: convertFontSize(12),
  },
});
