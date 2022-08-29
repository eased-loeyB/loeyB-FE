import React, {FC, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {
  AreaCategoryInput,
  LoeybAreaType,
  useRegisterCategoriesMutation,
} from '~/apollo/generated';
import BackgroundCommon from '~/components/BackgroundCommon';
import Button from '~/components/Button';
import {
  MainStackName,
  MainStackNavigationProps,
} from '~/navigation/stacks/MainStack';
import {useTypedSelector} from '~/store';
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

const SelectCategory: FC = () => {
  const {userName} = useTypedSelector(({user: {userData}}) => userData);
  const {navigate} = useNavigation<MainStackNavigationProps>();

  const [health, setHealth] = useState<SubCategoryProps[]>([]);
  const [mind, setMind] = useState<SubCategoryProps[]>([]);
  const [social, setSocial] = useState<SubCategoryProps[]>([]);
  const [life, setLife] = useState<SubCategoryProps[]>([]);
  const [work, setWork] = useState<SubCategoryProps[]>([]);
  const [registerCategories] = useRegisterCategoriesMutation({
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  const canNext =
    health.length + mind.length + social.length + life.length + work.length >=
    3;

  const submitData = () => {
    const areaCategory: AreaCategoryInput[] = [];
    health.forEach(({title}) =>
      areaCategory.push({area: LoeybAreaType.Health, category: title}),
    );
    mind.forEach(({title}) =>
      areaCategory.push({area: LoeybAreaType.Mind, category: title}),
    );
    social.forEach(({title}) =>
      areaCategory.push({area: LoeybAreaType.Social, category: title}),
    );
    life.forEach(({title}) =>
      areaCategory.push({area: LoeybAreaType.Hobby, category: title}),
    );
    work.forEach(({title}) =>
      areaCategory.push({area: LoeybAreaType.Work, category: title}),
    );
    registerCategories({
      variables: {
        areaCategory,
      },
    });
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
                navigate(MainStackName.WELCOME);
              }}
              enable={canNext}
            />
          </ButtonWrapper>
        </PageWrapper>
      </TouchableWithoutFeedback>
    </BackgroundCommon>
  );
};

export default SelectCategory;
