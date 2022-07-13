import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Login} from '~/screens/auth_stack/login_email';
import {LoginWithPassword} from '~/screens/auth_stack/login_password';
import {Register} from '~/screens/auth_stack/register';
import {RegisterWithPass} from '~/screens/auth_stack/register_with_pass';
import {Splash} from '~/screens/splash';

const Stack = createStackNavigator();
export const NameScreenAuthStack = {
  SPLASH: 'SPLASH',
  LOGIN: 'LOGIN',
  LOGIN_WITH_PASS: 'LOGIN_WITH_PASS',
  REGISTER: 'REGISTER',
  INPUT_NAME: 'INPUT_NAME',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  REGISTER_WITH_PASS: 'REGISTER_WITH_PASS',
};

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={NameScreenAuthStack.SPLASH} component={Splash} />
      <Stack.Screen name={NameScreenAuthStack.LOGIN} component={Login} />
      <Stack.Screen
        name={NameScreenAuthStack.LOGIN_WITH_PASS}
        component={LoginWithPassword}
      />
      <Stack.Screen name={NameScreenAuthStack.REGISTER} component={Register} />
      <Stack.Screen
        name={NameScreenAuthStack.REGISTER_WITH_PASS}
        component={RegisterWithPass}
      />
    </Stack.Navigator>
  );
};
