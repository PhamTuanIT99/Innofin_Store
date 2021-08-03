import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import News from '../screens/News/ListNews';
import DetailNews from '../screens/News/DetailNews';
import i18n from 'i18n-js';

function NewsScreen() {
  return <News />;
}
function DetailNewsScreen() {
  return <DetailNews />;
}
const Stack = createStackNavigator();
function CustomNewsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerStyle: { height: 100, backgroundColor: '#21409a' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpNews.News'),
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailNews"
        component={DetailNewsScreen}
        options={{
          headerStyle: { height: 100, backgroundColor: '#21409a' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpNews.News'),
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CustomNewsNavigator;
