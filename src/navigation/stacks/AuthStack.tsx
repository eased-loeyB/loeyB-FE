import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Login} from '../../screens/auth_stack/login_email';
import {LoginWithPassword} from '../../screens/auth_stack/login_password';
import {Register} from '../../screens/auth_stack/register';
import {InputName} from '../../screens/auth_stack/input_name';

const Stack = createStackNavigator();
export const NameScreenAuthStack = {
  LOGIN: 'Login',
  LOGIN_WITH_PASS: 'LOGIN_WITH_PASS',
  REGISTER: 'REGISTER',
    INPUT_NAME: 'INPUT_NAME',
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NameScreenAuthStack.LOGIN}>
      <Stack.Screen name={NameScreenAuthStack.LOGIN} component={Login} />
      <Stack.Screen
        name={NameScreenAuthStack.LOGIN_WITH_PASS}
        component={LoginWithPassword}
      />
      <Stack.Screen name={NameScreenAuthStack.REGISTER} component={Register} />
        <Stack.Screen name={NameScreenAuthStack.INPUT_NAME} component={InputName} />
    </Stack.Navigator>
  );
};
