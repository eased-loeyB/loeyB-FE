import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const LoginScreen = () => {
  return (
    <View style={{width: 400, height: 1000, backgroundColor: 'red'}}>
      <Text style={{textAlign: 'center', marginTop: 100, color: 'yellow'}}>
        Login
      </Text>
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
