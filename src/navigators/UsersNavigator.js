import React, { useCallback, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Users from '../screens/Users/UsersScreen';
import Detail from '../screens/Users/DetailProfile';
import Deposit from '../screens/Users/RequestDeposit';
import Help from '../screens/Users/Helpprofile';
import Setting from '../screens/Users/SettingProfile';
import Funding from '../screens/Users/RequestFunding';
import Change from '../screens/ChangePassword/ChangePassword';
import Update from '../screens/ManageProfile/ManageProfileScreen';
import HelpMe from '../screens/Users/Help';
import ReportProblem from '../screens/Users/ReportProblem';
import { Image, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { useNavigation, StackActions, useFocusEffect } from '@react-navigation/native';
import i18n from 'i18n-js';
import SuccessDeposit from '../screens/Users/SuccessDeposit';
import { Icon } from 'native-base';
import Statistical from '../screens/Users/Statistical';
import DetailHistory from '../screens/History/DetailCollector';
import { Badge } from 'react-native-elements';
import { GetlistNotify } from '../api/NotificationAPI';
import ImageIndentity from '../screens/KYC/UpdateIndetityImage';
import CardKyc from '../screens/KYC/CardKyc';
import CmndBefore from '../screens/KYC/CmndBefore';
import CmndAfter from '../screens/KYC/CmndAfter';
import TakeAfter from '../screens/KYC/TakeAfter';
import TakeBefore from '../screens/KYC/TakeIdBefore';
import FaceRec from '../screens/KYC/FaceRec';

function UsersScreen() {
  return <Users />;
}
function DetailProfile() {
  return <Detail />;
}
function RequestDeposit() {
  return <Deposit />;
}
function HelpProfile() {
  return <Help />;
}
function SettingProfile() {
  return <Setting />;
}
function RequestFunding() {
  return <Funding />;
}
function ChangePassword() {
  return <Change />;
}
function ManageProfileScreen() {
  return <Update />;
}
function SuccessDepositScreen() {
  return <SuccessDeposit />;
}
function StatisticalScreen() {
  return <Statistical />;
}
function DetailHistoryScreen() {
  return <DetailHistory />;
}
function UpdateIndentityImage() {
  return <ImageIndentity />;
}
function CardKycScreen() {
  return <CardKyc />;
}
function CmndBeforeScreen() {
  return <CmndBefore />;
}
function CmndAfterScreen() {
  return <CmndAfter />;
}
function TakeIdBefore() {
  return <TakeBefore />;
}
function TakeIdAfter() {
  return <TakeAfter />;
}
function FaceReco() {
  return <FaceRec />;
}
function ReportProblemScreen() {
  return <ReportProblem />;
}
function HelpMeScreen() {
  return <HelpMe />;
}
const Stack = createStackNavigator();
function CustomUsersNavigator() {
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
    <Stack.Navigator initialRouteName="Profile" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={UsersScreen}
        options={() => ({
          headerStyle: { height: 80, backgroundColor: '#FBFBFD', shadowColor: 'transparent' },
          headerTintColor: '#636363',
          headerTitle: '',
          headerTransparent: true,
          title: i18n.t('FinCCP::CcpAccount.Deposit'),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifycation')}
              style={{
                paddingTop: Platform.OS === 'ios' ? 0 : 23,
                paddingRight: 20,
                marginLeft: 20,
              }}>
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
        })}></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={DetailProfile}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.Infomation'),
          headerBackTitleVisible: false,
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
        }}></Stack.Screen>
      <Stack.Screen
        name="Deposit"
        component={RequestDeposit}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.Deposit'),

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
        name="Funding"
        component={RequestFunding}
        options={{
          headerStyle: { height: 100, backgroundColor: '#21409a' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpProfile.Funding'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="Help"
        component={HelpProfile}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.Help'),
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
        }}></Stack.Screen>
      <Stack.Screen
        name="Setting"
        component={SettingProfile}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.Settings'),
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
        name="Update"
        component={ManageProfileScreen}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          title: i18n.t('FinCCP::CcpProfile.Update'),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail')}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        }}></Stack.Screen>
      <Stack.Screen
        name="Change"
        component={ChangePassword}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.ChangePassword'),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
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
        name="SuccessDeposit"
        component={SuccessDepositScreen}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.Deposit'),
          headerLeft: () => null,
          gestureEnabled: false,
        })}></Stack.Screen>
      <Stack.Screen
        name="Statistical"
        component={StatisticalScreen}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpStatistical.Statistical'),
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.popToTop(1))}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        }}></Stack.Screen>
      <Stack.Screen
        name="ImageIndentity"
        component={UpdateIndentityImage}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpKYC.DocumentVerification'),
          headerBackTitleVisible: false,
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
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailCollector"
        component={DetailHistoryScreen}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpHistory.DetailCollection'),

          headerBackTitleVisible: false,
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
        }}></Stack.Screen>
      <Stack.Screen
        name="CardKyc"
        component={CardKycScreen}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpKYC.DocumentVerification'),
          headerBackTitleVisible: false,
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
        }}></Stack.Screen>
      <Stack.Screen
        name="CmndBefore"
        component={CmndBeforeScreen}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpKYC.FrontView'),

          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.push('TakeBefore'))}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        }}></Stack.Screen>
      <Stack.Screen
        name="CmndAfter"
        component={CmndAfterScreen}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          title: i18n.t('FinCCP::CcpKYC.BackSideShot'),
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.push('TakeAfter'))}
              style={{
                paddingTop: 5,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        }}></Stack.Screen>
      <Stack.Screen
        name="TakeBefore"
        component={TakeIdBefore}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#606060',
            shadowColor: 'transparent',
            elevation: 0,
          },
          title: i18n.t('FinCCP::CcpKYC.FrontView'),
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',

          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="TakeAfter"
        component={TakeIdAfter}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#606060',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpKYC.BackSideShot'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="FaceRec"
        component={FaceReco}
        options={{
          headerStyle: {
            height: 100,
            backgroundColor: '#000000',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpKYC.FaceRecognition'),
          headerBackTitleVisible: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblemScreen}
        options={() => ({
          headerStyle: {
            height: 80,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpReport.ReportProblem'),
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
        name="HelpMe"
        component={HelpMeScreen}
        options={() => ({
          headerStyle: {
            height: 100,
            backgroundColor: '#FBFBFD',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#636363',
          headerTitleAlign: 'center',
          title: i18n.t('FinCCP::CcpAccount.Help'),
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

export default CustomUsersNavigator;
const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  image: { width: 50, height: 50, marginRight: 15 },
  title: { fontSize: 20, color: 'white' },
  point: { fontSize: 15, color: 'white' },
  nextIcon: { width: 20, height: 20, justifyContent: 'flex-end' },
  text: { justifyContent: 'center' },
});
