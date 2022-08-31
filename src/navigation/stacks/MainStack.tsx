import React, {FC} from 'react';

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
  const {userName, categoryAndTags, stardustRecords} = useTypedSelector(
    ({user: {userData}}) => userData,
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!userName && (
        <Stack.Screen name={MainStackName.INPUT_NAME} component={InputName} />
      )}

      {!categoryAndTags.length && (
        <Stack.Screen
          name={MainStackName.SELECT_CATEGORY}
          component={SelectCategory}
        />
      )}

      {!stardustRecords.length && (
        <>
          <Stack.Screen name={MainStackName.WELCOME} component={Welcome} />
          <Stack.Screen
            name={MainStackName.FIRST_MEMORY}
            component={FirstMemory}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
