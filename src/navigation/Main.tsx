import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TabNavigator} from './TabNavigator';
import {MainStack} from './stacks/MainStack';

export const MainNavigatorStackName = {
  Main: 'Tab',
};

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator key={'MainNavigator'} screenOptions={{headerShown: false}}>
      <Stack.Screen name={MainNavigatorStackName.Main} component={MainStack} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
