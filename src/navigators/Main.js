import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../navigators/CustomHomeNavigator';
import History from '../navigators/CustomHistoryNavigator';
import User from '../navigators/UsersNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { Image } from 'react-native';

function HomeScreen() {
  return <Home />;
}

function HistoryScreen() {
  return <History />;
}

function UserScreen() {
  return <User />;
}
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === i18n.t('FinCCP::CcpCollection.Collection')) {
            {
              return (
                <Image
                  source={require('../../assets/thuho.png')}
                  style={{ height: 25, width: 25, tintColor: color }}
                />
              );
            }
          }
          if (route.name === i18n.t('FinCCP::CcpHistory.History')) {
            {
              return (
                <Image
                  source={require('../../assets/lichsu.png')}
                  style={{ height: 25, width: 25, tintColor: color }}
                />
              );
            }
          } else if (route.name === i18n.t('FinCCP::CcpProfile.Profile')) {
            {
              return (
                <Image
                  source={require('../../assets/nguoidung.png')}
                  style={{ height: 25, width: 25, tintColor: color }}
                />
              );
            }
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#C52AFE',
        inactiveTintColor: '#AEAEAE',
        style: {
          height: 60,
          paddingBottom: 5,
        },
        labelStyle: {
          fontSize: 13,
        },
      }}>
      <Tab.Screen
        name={i18n.t('FinCCP::CcpCollection.Collection')}
        component={HomeScreen}></Tab.Screen>
      <Tab.Screen
        name={i18n.t('FinCCP::CcpHistory.History')}
        component={HistoryScreen}></Tab.Screen>
      <Tab.Screen
        name={i18n.t('FinCCP::CcpProfile.Profile')}
        component={UserScreen}
        options={({ route }) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';
            if (routeName !== 'Profile') {
              return false;
            }
            return true;
          })(route),
        })}></Tab.Screen>
    </Tab.Navigator>
  );
}
