import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import styled from 'styled-components/native';

import BackgroundCommon from '~/components/BackgroundCommon';
import {Button} from '~/components/button';
import {navigate} from '~/navigation';
import {MainStackName} from '~/navigation/stacks/MainStack';
import {SubtitleStyle, TitleStyle} from '~/utils/Styles';

import Category from './Category';
import {SubCategoryProps} from './Category/CategoryItem';
import {
  healthCategory,
  healthTitle,
  lifeCategory,
  lifeTitle,
  mindCategory,
  mindTitle,
  socialCategory,
  socialTitle,
  workCategory,
  workTitle,
} from './constants';
import {
  AreaCategoryInput,
  useRegisterCategories,
} from './hook/useRegisterCategories';

const PageWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const TitleContainer = styled.View`
  align-items: center;
  padding: 0 24px 48px;
`;

const Title = styled.Text`
  ${TitleStyle}
  text-align: center;
`;

const Subtitle = styled.Text`
  ${SubtitleStyle}
  text-align: center;
  margin-top: 16px;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ButtonWrapper = styled.View`
  margin-top: 28px;
`;

// @ts-ignore
export const SelectCategory = ({route}) => {
  const {userName, email} = route?.params;
  const [health, setHealth] = useState<SubCategoryProps[]>([]);
  const [mind, setMind] = useState<SubCategoryProps[]>([]);
  const [social, setSocial] = useState<SubCategoryProps[]>([]);
  const [life, setLife] = useState<SubCategoryProps[]>([]);
  const [work, setWork] = useState<SubCategoryProps[]>([]);
  const {updateData} = useRegisterCategories(
    userName ?? '',
    email ?? 'huytd2510@gmail.com',
  );

  const canNext =
    health.length + mind.length + social.length + life.length + work.length >=
    3;

  const submitData = () => {
    const dataSubmit: AreaCategoryInput[] = [];
    health.forEach(h => dataSubmit.push({area: 'HEALTH', category: h.title}));
    mind.forEach(h => dataSubmit.push({area: 'MIND', category: h.title}));
    social.forEach(h => dataSubmit.push({area: 'SOCIAL', category: h.title}));
    life.forEach(h => dataSubmit.push({area: 'HOBBY', category: h.title}));
    work.forEach(h => dataSubmit.push({area: 'WORK', category: h.title}));
    updateData(dataSubmit);
  };

  return (
    <BackgroundCommon haveFilter={true} canGoBack={true} title={userName ?? ''}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PageWrapper>
          <TitleContainer>
            <Title>what do you want to organize?</Title>
            <Subtitle>Select atleast 3 categories</Subtitle>
          </TitleContainer>

          <Container>
            <Category
              title={healthTitle}
              child={healthCategory}
              color={'#F65454'}
              callback={data => {
                setHealth(data);
              }}
            />
            <Category
              title={mindTitle}
              child={mindCategory}
              color="#F6DD56"
              callback={data => {
                setMind(data);
              }}
            />
            <Category
              title={socialTitle}
              child={socialCategory}
              color="#8AE58B"
              callback={data => {
                setSocial(data);
              }}
            />
            <Category
              title={lifeTitle}
              child={lifeCategory}
              color="#49DFE9"
              callback={data => {
                setLife(data);
              }}
            />
            <Category
              title={workTitle}
              child={workCategory}
              color="#BE4FC8"
              callback={data => {
                setWork(data);
              }}
            />
          </Container>
          <ButtonWrapper>
            <Button
              title={'Next'}
              callback={() => {
                submitData();
                navigate(MainStackName.Welcome, {userName});
              }}
              enable={canNext}
            />
          </ButtonWrapper>
        </PageWrapper>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};
