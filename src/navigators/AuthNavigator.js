import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LocalizationContext } from '../contexts/LocalizationContext';
import LoginScreen from '../screens/Login/LoginScreen';
import Forgot from '../screens/Forgotpassword/Forgotpassword';
import FirstLogin from '../screens/Login/FirstLoginScreen';
import StartLogin from '../screens/Login/StartLogin';
import { TouchableOpacity } from 'react-native';
import { ImageBackground, Image } from 'react-native';
import SuccessForgotPassword from '../screens/Login/SuccessForgotPassword';
import { StackActions } from '@react-navigation/native';
import SuccessFirstLogin from '../screens/Login/SuccessFisrtLogin';
import Register from '../screens/Login/RegisterUser';
import ConfirmOTP from '../screens/Login/ConfirmOTP';

const Stack = createStackNavigator();
function ForgotScreen() {
  return <Forgot />;
}
function FirstLogincreen() {
  return <FirstLogin />;
}
function StartLoginScreen() {
  return <StartLogin />;
}
function SuccessForgotPasswordScreen() {
  return <SuccessForgotPassword />;
}
function SuccessFirstLoginScreen() {
  return <SuccessFirstLogin />;
}
function RegisterScreen() {
  return <Register />;
}
function ConfirmOTPScreen() {
  return <ConfirmOTP />;
}
export default function AuthStackNavigator() {
  const { t } = React.useContext(LocalizationContext);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          title: t('AbpAccount::Login'),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              style={{
                paddingTop: 55,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FirstLogin"
        component={FirstLogincreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <ImageBackground
              style={{ width: 50, height: 50, marginTop: 60, paddingRight: 50, marginLeft: 20 }}
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              source={require('../../assets/prev.png')}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(StackActions.pop(1))}
                style={{
                  paddingTop: 50,
                  paddingRight: 60,
                  borderRadius: 50,
                  zIndex: 10,
                  opacity: 0,
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/prev.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
          ),
        })}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <ImageBackground
              style={{ width: 50, height: 50, marginTop: 60, paddingRight: 50, marginLeft: 20 }}
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              source={require('../../assets/prev.png')}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(StackActions.pop(1))}
                style={{
                  paddingTop: 50,
                  paddingRight: 60,
                  borderRadius: 50,
                  zIndex: 10,
                  opacity: 0,
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/prev.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
          ),
        })}
      />
      <Stack.Screen
        name="StartLogin"
        component={StartLoginScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SuccessForgotPassword"
        component={SuccessForgotPasswordScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SuccessFirstLogin"
        component={SuccessFirstLoginScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ConfirmOTP"
        component={ConfirmOTPScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.pop(1))}
              style={{
                paddingTop: 55,
                paddingRight: 50,
                marginLeft: 20,
              }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/prev.png')} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
