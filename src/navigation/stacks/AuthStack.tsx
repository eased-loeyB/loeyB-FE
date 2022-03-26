import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const LoginScreen = () => {
  return (
    <View style={{width: 100, height: 100, backgroundColor: 'red'}}>
      <Text>Login</Text>
    </View>
  );
};

export const NameScreenAuthStack = {
  LOGIN: 'Login',
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NameScreenAuthStack.LOGIN}>
      <Stack.Screen name={NameScreenAuthStack.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
