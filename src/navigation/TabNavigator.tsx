import React from 'react';
import {Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import {MainStyles} from './styles';

const Tab = createBottomTabNavigator();

const Example = () => {
  return <Text>sfjklsfsjklflskdjf</Text>;
};

export const NameTabs = {
  HomeTab: 'HomeTab',
  KeywordsTab: 'KeywordsTab',
  InsightTab: 'InsightTab',
  ProfileTab: 'ProfileTab',
};

export const TabNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: MainStyles.tabBarStyle,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={NameTabs.HomeTab}
        key={NameTabs.HomeTab}
        component={Example}
        options={{
          tabBarLabel: t('tabs.lang'),
        }}
      />
      <Tab.Screen
        name={NameTabs.KeywordsTab}
        key={NameTabs.KeywordsTab}
        component={Example}
        options={{
          tabBarLabel: t('tabs.lang'),
        }}
      />
      <Tab.Screen
        name={NameTabs.InsightTab}
        key={NameTabs.InsightTab}
        component={Example}
        options={{
          tabBarLabel: t('tabs.lang'),
        }}
      />
      <Tab.Screen
        name={NameTabs.ProfileTab}
        key={NameTabs.ProfileTab}
        component={Example}
        options={{
          tabBarLabel: t('tabs.lang'),
        }}
      />
    </Tab.Navigator>
  );
};
