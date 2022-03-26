import {convertFontSize, GrayColors} from '../utils';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProviderCompat} from '@react-navigation/elements';
import {ACCOUNT_CIRCLE_ICON} from '../assets';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Platform, View} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {MainStyles} from './styles';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const Example = () => {
  return <Text>sfjklsfsjklflskdjf</Text>;
};

export const NameTabs = {
  HomeTab: 'HomeTab',
  ProfileTab: 'ProfileTab',
};

export const TabNavigator = () => {
  const {t} = useTranslation();
  const getPaddingBottom = (insets: EdgeInsets) => {
    if (Platform.OS === 'android') {
      return 0;
    }
    return Math.max(insets.bottom - Platform.select({ios: 4, default: 0}), 0);
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: [
          MainStyles.tabBarStyle,
          {
            paddingBottom: getPaddingBottom(
              SafeAreaProviderCompat.initialMetrics.insets,
            ),
          },
        ],
        tabBarIcon: ({focused, color}) => {
          let source;
          let childView = null;

          switch (route.name) {
            case NameTabs.HomeTab:
              source = focused ? ACCOUNT_CIRCLE_ICON : ACCOUNT_CIRCLE_ICON;
              break;
            case NameTabs.ProfileTab:
              source = focused ? ACCOUNT_CIRCLE_ICON : ACCOUNT_CIRCLE_ICON;
              break;
          }

          return (
            <View>
              <Image
                source={source}
                style={{
                  paddingTop: 4,
                  tintColor: color,
                }}
              />
              {childView}
            </View>
          );
        },
        tabBarActiveTintColor: GrayColors.Gray900,
        tabBarInactiveTintColor: GrayColors.Gray600,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: convertFontSize(12),
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name={NameTabs.HomeTab}
        key={NameTabs.HomeTab}
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
