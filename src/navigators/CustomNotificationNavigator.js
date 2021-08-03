import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from '../screens/Notification/ListNotification';
import i18n from 'i18n-js';

function NotificationScreen() {
  return <Notification />;
}
const Stack = createStackNavigator();
function CustomNotificationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifycation"
        component={NotificationScreen}
        options={{
          headerStyle: { height: 100, backgroundColor: '#21409a' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpNotification.Notification'),
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CustomNotificationNavigator;
