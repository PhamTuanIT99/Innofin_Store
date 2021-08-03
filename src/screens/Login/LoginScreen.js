import { Formik } from 'formik';
import i18n from 'i18n-js';
import { Button, Form, Input, Item, Label, Text, H1, Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Linking,
  StyleSheet,
  View,
  Keyboard,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { login } from '../../api/AccountAPI';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTracking } from '../../hooks/Tracking';
import { ScrollView } from 'react-native';
import Firebase from '../../components/PushNotify/setPushNotify';

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
  password: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
});

function LoginScreen({ startLoading, stopLoading, setToken, fetchAppConfig }) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  const listenNotification = async () => {
    await Firebase.onCheckPermission();
  };

  useEffect(() => {
    listenNotification();
  }, []);

  const load = async () => {
    AsyncStorage.getItem('FirstTime').then(result => {
      if (result !== null) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('StartLogin');
      }
    });
  };
  const submit = ({ username, password }) => {
    startLoading({ key: 'login' });
    login({ username, password })
      .then(data => {
        setToken({
          ...data,
          expire_time: new Date().valueOf() + data.expires_in,
          scope: undefined,
        });
      })
      .then(
        () =>
          new Promise(resolve =>
            fetchAppConfig({ showLoading: false, callback: () => resolve(true) }),
          ),
      )
      .finally(() => stopLoading({ key: 'login' }));
  };
  const navigation = useNavigation();
  const [tracking, setTracking] = useTracking();

  useEffect(() => {
    if (!tracking.tracking) {
      setTracking({
        tracking: false,
      });
    }
  }, []);

  return (
    <ImageBackground style={styles.image} source={require('../../../assets/Rectangle-76.png')}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? -150 : -200}
          enabled
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? null : null}>
          {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
          <ScrollView>
            <View style={styles.viewForm}>
              <Image style={styles.Logo} source={require('../../../assets/ino.jpg')} />
              <Label style={styles.collection}>{i18n.t('FinCCP::CcpLogo.Collectionervice')}</Label>
              <Formik
                validationSchema={ValidationSchema}
                initialValues={{ username: '', password: '' }}
                onSubmit={submit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <Form style={styles.login}>
                    <Text style={styles.titleID}>{i18n.t('FinCCP::CcpLogin.Email')}</Text>
                    <Item style={styles.inputID}>
                      <Input
                        style={{ height: 45 }}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        onSubmitEditing={() => passwordRef.current._root.focus()}
                        returnKeyType="next"
                        autoCapitalize="none"
                      />
                      <Icon name="person" style={{ color: '#C1C1C1' }} />
                    </Item>
                    {errors.username && touched.username ? (
                      <ValidationMessage>{errors.username}</ValidationMessage>
                    ) : null}

                    <Text style={styles.titlePW}>{i18n.t('AbpAccount::Password')}</Text>
                    <Item style={styles.inputID}>
                      <Input
                        style={{ height: 45 }}
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        ref={passwordRef}
                        autoCapitalize="none"
                      />
                      <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                        style={{ color: '#C1C1C1' }}
                      />
                    </Item>
                    {errors.password && touched.password ? (
                      <ValidationMessage>{errors.password}</ValidationMessage>
                    ) : null}
                    <View style={styles.btLogin}>
                      <Button style={styles.buttonLogin} abpButton onPress={handleSubmit}>
                        <Text>{i18n.t('AbpAccount::Login')}</Text>
                      </Button>
                    </View>
                  </Form>
                )}
              </Formik>
              <TouchableOpacity
                style={styles.forgotpassword}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.passwordcolor}>{i18n.t('FinCCP::CcpLogin.Register')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgotpassword}
                onPress={() => navigation.navigate('Forgot')}>
                <Text style={styles.passwordcolor}>
                  {i18n.t('FinCCP::CcpAccount.ForgotPassword')}?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.phoneCall}
                onPress={() => {
                  Linking.openURL('tel:0981163379');
                }}>
                <Image style={styles.phone} source={require('../../../assets/phonehelp.png')} />
                <Text style={styles.hotline}>Hotline: 0981163379</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

LoginScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  fetchAppConfig: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: LoginScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    fetchAppConfig: AppActions.fetchAppConfigAsync,
    setToken: PersistentStorageActions.setToken,
  },
});
const styles = StyleSheet.create({
  viewForm: { width: '90%', alignItems: 'center', marginLeft: '5%' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    marginTop: '10%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  collection: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  buttonLogin: {
    backgroundColor: '#2CD1F8',
    width: '90%',
    borderRadius: 8,
    textTransform: 'none',
  },
  forgotpassword: {
    marginTop: '10%',
  },
  hotline: {
    fontWeight: 'bold',
    color: '#ED822E',
    fontSize: 18,
  },
  passwordcolor: {
    color: '#636363',
  },
  btLogin: { marginTop: 20, alignItems: 'center', paddingBottom: 25 },
  Logo: { maxWidth: '50%', maxHeight: 50, resizeMode: 'stretch', marginTop: '25%' },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  inputID: { borderWidth: 1, width: '90%', marginLeft: '5%', marginTop: 0, marginBottom: 10 },
  titleID: { marginLeft: '5%', marginTop: '5%', opacity: 0.5 },
  titlePW: { marginLeft: '5%', opacity: 0.5 },
  phone: {
    marginRight: 5,
    width: 24,
    height: 24,
  },
  phoneCall: { flexDirection: 'row', justifyContent: 'center', marginTop: '1.5%' },
});
