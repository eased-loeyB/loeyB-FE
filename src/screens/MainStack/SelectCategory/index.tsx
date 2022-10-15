import React, {FC, useMemo, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {
  AreaCategoryInput,
  LoeybAreaType,
  useRegisterCategoriesMutation,
} from '~/apollo/generated';
import {isSuccessResponse} from '~/apollo/utils/error';
import BackgroundCommon from '~/components/BackgroundCommon';
import Button from '~/components/Button';
import {
  MainStackName,
  MainStackNavigationProps,
} from '~/navigation/stacks/MainStack';
import {useTypedSelector} from '~/store';
import {updateUserData} from '~/store/reduxtoolkit/user/userSlice';
import {AreaColorMap} from '~/utils/Colors';
import {BottomWrapperStyle, SubtitleStyle, TitleStyle} from '~/utils/Styles';

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
  ${BottomWrapperStyle}
`;

const SelectCategory: FC = () => {
  const {userName} = useTypedSelector(({user: {userData}}) => userData);
  const {navigate} = useNavigation<MainStackNavigationProps>();
  const dispatch = useDispatch();

  const [health, setHealth] = useState<SubCategoryProps[]>([]);
  const [mind, setMind] = useState<SubCategoryProps[]>([]);
  const [social, setSocial] = useState<SubCategoryProps[]>([]);
  const [life, setLife] = useState<SubCategoryProps[]>([]);
  const [work, setWork] = useState<SubCategoryProps[]>([]);
  const [registerCategories] = useRegisterCategoriesMutation({
    onCompleted: ({registerCategories: {result}}) => {
      if (isSuccessResponse(result)) {
        dispatch(
          updateUserData({
            areaAndCategoryAndTags: areaCategory.map(value => ({
              ...value,
              tag: [],
            })),
          }),
        );
        navigate(MainStackName.WELCOME);
      }
    },
  });

  const canNext =
    health.length + mind.length + social.length + life.length + work.length >=
    3;

  const areaCategory = useMemo(() => {
    const areaCategoryInput: AreaCategoryInput[] = [];

    health.forEach(({title}) =>
      areaCategoryInput.push({area: LoeybAreaType.Health, category: title}),
    );
    mind.forEach(({title}) =>
      areaCategoryInput.push({area: LoeybAreaType.Mind, category: title}),
    );
    social.forEach(({title}) =>
      areaCategoryInput.push({area: LoeybAreaType.Social, category: title}),
    );
    life.forEach(({title}) =>
      areaCategoryInput.push({area: LoeybAreaType.Hobby, category: title}),
    );
    work.forEach(({title}) =>
      areaCategoryInput.push({area: LoeybAreaType.Work, category: title}),
    );

    return areaCategoryInput;
  }, [health, mind, social, life, work]);

  const submitData = () => {
    registerCategories({
      variables: {
        areaCategory,
      },
    });
  };

  return (
    <BackgroundCommon haveFilter={true} canGoBack={true} isAuth={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PageWrapper>
          <TitleContainer>
            <Title>{`${userName}\nWhat do you want\nto organize?`}</Title>
            <Subtitle>Select atleast 3 categories</Subtitle>
          </TitleContainer>

          <Container>
            <Category
              title={healthTitle}
              child={healthCategory}
              color={AreaColorMap[LoeybAreaType.Health]}
              callback={data => {
                setHealth(data);
              }}
            />
            <Category
              title={mindTitle}
              child={mindCategory}
              color={AreaColorMap[LoeybAreaType.Mind]}
              callback={data => {
                setMind(data);
              }}
            />
            <Category
              title={socialTitle}
              child={socialCategory}
              color={AreaColorMap[LoeybAreaType.Social]}
              callback={data => {
                setSocial(data);
              }}
            />
            <Category
              title={lifeTitle}
              child={lifeCategory}
              color={AreaColorMap[LoeybAreaType.Hobby]}
              callback={data => {
                setLife(data);
              }}
            />
            <Category
              title={workTitle}
              child={workCategory}
              color={AreaColorMap[LoeybAreaType.Work]}
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
                // navigate(MainStackName.WELCOME);
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
