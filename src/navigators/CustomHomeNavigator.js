import React, { useCallback, useEffect, useState } from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import Home from '../screens/Home/HomeScreen';
import Collection from '../screens/Home/Collection';
import StartCollection from '../screens/Home/StartCollection';
import Statement from '../screens/Home/Statement';
import Complete from '../screens/Home/CompleteCollection';
import Proof from '../screens/Home/proofScreen';
import { Image, Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProfileDetail } from '../api/IdentityAPI';
import i18n from 'i18n-js';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'native-base';
import Notification from '../screens/Notification/ListNotification';
import { Badge } from 'react-native-elements';
import { GetlistNotify } from '../api/NotificationAPI';
import DetailDeposit from '../screens/History/DetailDeposit';
import CreateCollection from '../screens/Home/CreateCollection';
import Funds from '../screens/Home/funds';

function HomeScreen() {
  return <Home />;
}
function FundsScreen() {
  return <Funds />;
}
function CollectionScreen() {
  return <Collection />;
}
function NotificationScreen() {
  return <Notification />;
}
function StartCollectionScreen() {
  return <StartCollection />;
}
function StatementScreen() {
  return <Statement />;
}
function CompleteCollectionScreen() {
  return <Complete />;
}
function proofScreen() {
  return <Proof />;
}
function DetailDepositScreen() {
  return <DetailDeposit />;
}
function CreateCollectionScreen() {
  return <CreateCollection />;
}
function LogoTitleDetail() {
  const [user, setUser] = useState({});
  const fetchUser = () => {
    getProfileDetail().then(data => {
      setUser(data || {});
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/user.png')} />
      <View style={styles.text}>
        <Text numberOfLines={1} style={styles.title}>
          {i18n.t('FinCCP::CcpAccount.Hello')}, {user.surname} {user.name}!
        </Text>
        <Text style={styles.point}>
          {i18n.t('FinCCP::CcpAccount.PointsAccountBalance')}:{' '}
          <Text style={{ fontWeight: 'bold' }}>
            {user.point == undefined ? 0 : user.point.toLocaleString('en-US')}
          </Text>
          <Text style={{ textTransform: 'lowercase' }}> {i18n.t('FinCCP::CcpAccount.Point')}</Text>
        </Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee', height: 128 }}>
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
    <Header {...props} />
  </View>
);
const Stack = createStackNavigator();
function CustomHomeNavigator() {
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
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitle: props => <LogoTitleDetail {...props} />,
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingVertical: Platform.OS === 'ios' ? 0 : 27,
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 25,
              }}
              onPress={() => navigation.navigate('Notifycation')}>
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
        name="Collection"
        component={CollectionScreen}
        options={() => ({
          headerShown: false,
        })}></Stack.Screen>
      <Stack.Screen
        name="StartCollection"
        component={StartCollectionScreen}
        options={() => ({
          headerShown: false,
        })}></Stack.Screen>
      <Stack.Screen
        name="Statement"
        component={StatementScreen}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#FAFAFA',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpCollection.ElectronicStatement'),

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        })}></Stack.Screen>
      <Stack.Screen
        name="Proof"
        component={proofScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpStatement.Proof'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="CompleteCollection"
        component={CompleteCollectionScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpCollection.CompletedCollection'),
          headerBackTitleVisible: false,
          headerLeft: () => null,
          gestureEnabled: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="Notifycation"
        component={NotificationScreen}
        options={{
          header: props => <GradientHeader {...props} />,
          headerStyle: { height: 128, backgroundColor: 'transparent', elevation: 0 },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpNotification.Notification'),
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
          title: i18n.t('FinCCP::CcpNotification.Notification'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="CreateCollection"
        component={CreateCollectionScreen}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: 'white',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: 'Thêm đơn thu hộ',

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        })}></Stack.Screen>
      <Stack.Screen
        name="Funds"
        component={FundsScreen}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: 'white',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: 'Thêm đơn thu hộ',

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        })}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CustomHomeNavigator;
const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  image: { width: 60, height: 60, marginRight: 10, marginLeft: 10 },
  title: { fontSize: 18, color: 'white', fontWeight: '600', width: 230 },
  point: { fontSize: 15, color: 'white' },
  text: { justifyContent: 'space-evenly', marginRight: 40 },
});
