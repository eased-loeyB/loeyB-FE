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
import TextField from '../../../components/text_field';
import {
  convertHeight,
  convertWidth,
  deviceHeight,
  deviceWidth,
} from '../../../utils';
import {CommonStyles} from '../../../utils/Styles';
import {Button} from '../../../components/button';
import _ from 'lodash';
import {BACKGROUND_INPUT_NAME, FOOD, GOOGLE_LOGIN} from '../../../assets';
import {validateEmail} from '../../../utils/Validate';
import {NameScreenAuthStack} from '../../../navigation/stacks';
import {navigate, push} from '../../../navigation';
import {Category, SubCategoryProps} from './child';
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
} from './Const';
import {MainStackName} from '../../../navigation/stacks/MainStack';

// @ts-ignore
export const SelectCategory = ({route}) => {
  const {userName} = route?.params;
  const [health, setHealth] = useState<SubCategoryProps[]>([]);
  const [mind, setMind] = useState<SubCategoryProps[]>([]);
  const [social, setSocial] = useState<SubCategoryProps[]>([]);
  const [life, setLife] = useState<SubCategoryProps[]>([]);
  const [work, setWork] = useState<SubCategoryProps[]>([]);

  return (
    <BackgroundCommon haveFilter={true} canGoBack={true} title={userName ?? ''}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.container}>
            <Text
              style={{
                ...CommonStyles.title,
                textAlign: 'center',
              }}>
              what do you want to organize?
            </Text>
            <Text style={styles.subTitle}>Select atleast 3 categories</Text>

            <View
              style={{
                marginTop: convertHeight(50),
                minWidth: convertWidth(150),
              }}
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Category
              title={healthTitle}
              child={healthCategory}
              style={{color: '#F65454'}}
              callback={data => {
                setHealth(data);
              }}
            />
            <Category
              title={mindTitle}
              child={mindCategory}
              style={{color: '#F6DD56'}}
              callback={data => {
                setMind(data);
              }}
            />
            <Category
              title={socialTitle}
              child={socialCategory}
              style={{color: '#8AE58B'}}
              callback={data => {
                setSocial(data);
              }}
            />
            <Category
              title={lifeTitle}
              child={lifeCategory}
              style={{color: '#49DFE9'}}
              callback={data => {
                setLife(data);
              }}
            />
            <Category
              title={workTitle}
              child={workCategory}
              style={{color: '#BE4FC8'}}
              callback={data => {
                setWork(data);
              }}
            />
          </View>
          <View style={{marginTop: 28}}>
            <Button
              title={'Next'}
              callback={() => {
                navigate(MainStackName.Welcome, {userName});
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
    paddingHorizontal: convertWidth(24),
    alignItems: 'center',
  },
  subTitle: {
    ...CommonStyles.subTitle,
    marginTop: convertHeight(17),
    textAlign: 'center',
  },
});
