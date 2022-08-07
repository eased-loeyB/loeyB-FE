import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import styled from 'styled-components/native';

import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import TextField from '~/components/text_field';
import {navigate} from '~/navigation';
import {NameScreenAuthStack} from '~/navigation/stacks';
import {SubtitleStyle, TitleStyle} from '~/utils/Styles';

const PageWrapper = styled.View`
  flex: 1;
  padding: 0 16px;
  margin-top: 60px;
`;

const Subtitle = styled.Text`
  ${SubtitleStyle}
`;

const Title = styled.Text`
  ${TitleStyle}
  margin-top: 12px;
`;

const EmailInputWrapper = styled.View`
  margin-top: 48px;
`;

const CodeInputWrapper = styled.View`
  margin-top: 12px;
`;

const ButtonWrapper = styled.View`
  margin-top: 28px;
`;

// @ts-ignore
export const Register = ({route}) => {
  const email = route?.params?.email ?? '';
  const [code, setCode] = useState('');

  const isValidCode = code.length === 6;

  const canNext = isValidCode;
  return (
    <BackgroundCommon haveFilter={true} canGoBack={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PageWrapper>
          <Subtitle>Sign up</Subtitle>
          <Title>Verify your email</Title>
          <EmailInputWrapper>
            <TextField value={email} editable={false} />
          </EmailInputWrapper>
          <CodeInputWrapper>
            <TextField
              value={code}
              onTextChange={value => setCode(value)}
              placeholder={'Code'}
              errorMsg={!!code && !isValidCode ? 'Not 6 characters yet' : ''}
            />
          </CodeInputWrapper>
          <ButtonWrapper>
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
          </ButtonWrapper>
        </PageWrapper>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
