import React, { useCallback, useState } from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import History from '../screens/History/History';
import DetailCollector from '../screens/History/DetailCollector';
import DetailF from '../screens/History/DetailFunding';
import DetailDeposit from '../screens/History/DetailDeposit';
import i18n from 'i18n-js';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import { GetlistNotify } from '../api/NotificationAPI';
import { Badge } from 'react-native-elements';
import Notification from '../screens/Notification/ListNotification';

function HistoryScreen() {
  return <History />;
}
function DetailCollectorScreen() {
  return <DetailCollector />;
}
function DetailFunding() {
  return <DetailF />;
}
function DetailDepositScreen() {
  return <DetailDeposit />;
}
function NotificationScreen() {
  return <Notification />;
}
const Stack = createStackNavigator();
const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee', height: 128, overflow: 'hidden' }}>
    <LinearGradient
      colors={['hsla(184, 94%, 53%, 1)', 'hsla(213, 94%, 66%, 1)', 'hsla(280, 98%, 60%, 1)']}
      style={[StyleSheet.absoluteFill]}
    />
    <Image
      style={{
        position: 'absolute',
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginTop: '5%',
      }}
      source={require('../../assets/Union.png')}
    />
    <Header {...props} style={{ backgroundColor: 'transparent' }} />
  </View>
);

function CustomHistoryNavigator() {
  const navigation = useNavigation();
  const [seen, setSeen] = useState(0);
  const fetchNotify = () => {
    GetlistNotify().then(data => {
      setSeen(data.totalUnSeen || {});
    });
  };
  useFocusEffect(
    useCallback(() => {
      fetchNotify();
    }, []),
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitleStyle: { color: '#fff' },
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpHistory.History'),
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingVertical: Platform.OS === 'ios' ? 0 : 27,
                paddingLeft: 50,
                paddingRight: 20,
                marginBottom: 25,
              }}
              onPress={() => navigation.navigate('Notification1')}>
              <View>
                <Icon style={{ color: 'white' }} name="notifications-outline" />
                {seen > 0 ? (
                  <Badge
                    value={seen}
                    status="error"
                    containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          ),
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailCollector"
        component={DetailCollectorScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpHistory.DetailCollection'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailDeposit"
        component={DetailDepositScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpHistory.DetailDeposit'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailF"
        component={DetailFunding}
        options={{
          headerStyle: { height: 128, backgroundColor: '#21409a' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpHistory.DetailFunding'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="Notification1"
        component={NotificationScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpNotification.Notification'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CustomHistoryNavigator;
