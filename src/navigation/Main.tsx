import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TabNavigator} from './TabNavigator';

export const MainNavigatorStackName = {
  Main: 'Tab',
};

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator key={'MainNavigator'} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={MainNavigatorStackName.Main}
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
