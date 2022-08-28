import React, {FC} from 'react';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import Login from '~/screens/AuthStack/Login';
import LoginWithPassword from '~/screens/AuthStack/LoginPassword';
import Register from '~/screens/AuthStack/Register';
import RegisterWithPass from '~/screens/AuthStack/RegisterWithPass';

export enum AuthStackName {
  LOGIN = 'LOGIN',
  LOGIN_WITH_PASS = 'LOGIN_WITH_PASS',
  REGISTER = 'REGISTER',
  REGISTER_WITH_PASS = 'REGISTER_WITH_PASS',
}

export type AuthStackParamList = {
  [AuthStackName.LOGIN]: undefined;
  [AuthStackName.LOGIN_WITH_PASS]: {
    email: string;
  };
  [AuthStackName.REGISTER]: {
    email: string;
  };
  [AuthStackName.REGISTER_WITH_PASS]: {
    email: string;
    code: string;
  };
};

export type AuthStackNavigationProps = StackNavigationProp<AuthStackParamList>;

const Stack = createStackNavigator();

const AuthStack: FC = () => (
  <Stack.Navigator
    initialRouteName={AuthStackName.LOGIN}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={AuthStackName.LOGIN} component={Login} />
    <Stack.Screen
      name={AuthStackName.LOGIN_WITH_PASS}
      component={LoginWithPassword}
    />
    <Stack.Screen name={AuthStackName.REGISTER} component={Register} />
    <Stack.Screen
      name={AuthStackName.REGISTER_WITH_PASS}
      component={RegisterWithPass}
    />
  </Stack.Navigator>
);

export default AuthStack;
