import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Welcome} from '../../screens/auth_stack/welcome';
import {FirstMemory} from '../../screens/memore_stack/first_memory';
import {InputName} from '../../screens/auth_stack/input_name';
import {SelectCategory} from '../../screens/auth_stack/select_category';
import {NameScreenAuthStack} from './AuthStack';

const Stack = createStackNavigator();
export const MainStackName = {
  Welcome: 'Welcome',
  FIRST_MEMORY: 'FIRST_MEMORY',
    CAMERA: 'CAMERA',
};

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={NameScreenAuthStack.INPUT_NAME}
        component={InputName}
      />
      <Stack.Screen
        name={NameScreenAuthStack.SELECT_CATEGORY}
        component={SelectCategory}
      />
      <Stack.Screen name={MainStackName.Welcome} component={Welcome} />
      <Stack.Screen name={MainStackName.FIRST_MEMORY} component={FirstMemory} />
    </Stack.Navigator>
  );
};
