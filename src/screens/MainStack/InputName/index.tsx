import React, {FC, useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {rgba} from 'polished';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {useDispatch} from 'react-redux';
import styled, {css} from 'styled-components/native';

import {useSetUsernameMutation} from '~/apollo/generated';
import {isSuccessResponse} from '~/apollo/utils/error';
import BackgroundCommon from '~/components/BackgroundCommon';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import {
  MainStackName,
  MainStackNavigationProps,
} from '~/navigation/stacks/MainStack';
import {updateUserData} from '~/store/reduxtoolkit/user/userSlice';
import {ColorMap} from '~/utils/Colors';
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
  width: 200px;
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

const InputName: FC = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<MainStackNavigationProps>();
  const [name, setName] = useState('');
  const isValidName = !isEmpty(name) && name.length < 31;

  const [requestSetUsername] = useSetUsernameMutation({
    onCompleted: ({setUsername: {result}}) => {
      if (isSuccessResponse(result)) {
        dispatch(updateUserData({userName: name}));
        navigate(MainStackName.SELECT_CATEGORY);
      }
    },
  });

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
              center={[88, 88]}
              radius={176}>
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
                requestSetUsername({
                  variables: {
                    username: name,
                  },
                });
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
    width: 140,
    height: 36,
    backgroundColor: 'transparent',
  },
  textInput: {
    color: ColorMap.Black,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default InputName;
