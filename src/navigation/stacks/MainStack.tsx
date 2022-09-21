import React, {FC, useMemo} from 'react';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import FirstMemory from '~/screens/MainStack/FirstMemory';
import InputName from '~/screens/MainStack/InputName';
import SelectCategory from '~/screens/MainStack/SelectCategory';
import Welcome from '~/screens/MainStack/Welcome';
import {useTypedSelector} from '~/store';

export enum MainStackName {
  INPUT_NAME = 'INPUT_NAME',
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  WELCOME = 'WELCOME',
  FIRST_MEMORY = 'FIRST_MEMORY',
  CAMERA = 'CAMERA',
}

export type MainStackNavigationProps = StackNavigationProp<
  Record<MainStackName, undefined>
>;

const Stack = createStackNavigator();

const MainStack: FC = () => {
  const {userName, categoryAndTags} = useTypedSelector(
    ({user: {userData}}) => userData,
  );

  const initialRouteName: MainStackName = useMemo(() => {
    if (!userName) {
      return MainStackName.INPUT_NAME;
    }

    if (!categoryAndTags.length) {
      return MainStackName.SELECT_CATEGORY;
    }

    return MainStackName.WELCOME;
  }, [userName, categoryAndTags]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={MainStackName.INPUT_NAME} component={InputName} />

      <Stack.Screen
        name={MainStackName.SELECT_CATEGORY}
        component={SelectCategory}
      />

      <Stack.Screen name={MainStackName.WELCOME} component={Welcome} />
      <Stack.Screen name={MainStackName.FIRST_MEMORY} component={FirstMemory} />
    </Stack.Navigator>
  );
};

export default MainStack;
