import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProviderCompat} from '@react-navigation/elements';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {EdgeInsets} from 'react-native-safe-area-context';
import {MainStyles} from './styles';
import {Text} from 'react-native';
import {Platform} from 'react-native';

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

const getPaddingBottom = (insets: EdgeInsets) => {
  if (Platform.OS === 'android') {
    return 0;
  }
  return Math.max(insets.bottom - Platform.select({ios: 4, default: 0}), 0);
};

export const Default_TabBarStyle = [
  MainStyles.tabBarStyle,
  {
    paddingBottom: getPaddingBottom(
      SafeAreaProviderCompat.initialMetrics.insets,
    ),
  },
];

export const TabNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: Default_TabBarStyle,
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
