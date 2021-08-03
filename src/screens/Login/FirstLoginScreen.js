import { Formik } from 'formik';
import i18n from 'i18n-js';
import { Button, Form, Input, Item, Label, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Keyboard,
  Image,
  StatusBar,
} from 'react-native';
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

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
  password: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
});

function FirstLogin({ startLoading, stopLoading, setToken, fetchAppConfig }) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  const submit = ({ username, password }) => {
    startLoading({ key: 'login' });
    login({ username, password })
      .then(data =>
        setToken({
          ...data,
          expire_time: new Date().valueOf() + data.expires_in,
          scope: undefined,
        }),
      )
      .then(
        () =>
          new Promise(resolve =>
            fetchAppConfig({ showLoading: false, callback: () => resolve(true) }),
          ),
      )
      .finally(() => stopLoading({ key: 'login' }));
  };
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground style={styles.image} source={require('../../../assets/Rectangle-76.png')}>
        {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
        <Image style={styles.Logo} source={require('../../../assets/lock.png')} />
        <Label style={styles.collection}>{i18n.t('FinCCP::CcpLogin.FirstLogin')}</Label>
        <Label style={styles.requestPW}>
          {i18n.t('FinCCP::CcpAccount.PleaseEnterANewPassword')}
        </Label>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={submit}>
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <Form style={styles.login}>
              <Text style={styles.titleID}>{i18n.t('FinCCP::CcpAccount.NewPassword')}</Text>
              <Item style={styles.inputID}>
                <Input
                  style={{ height: 40 }}
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  onSubmitEditing={() => passwordRef.current._root.focus()}
                  returnKeyType="next"
                  autoCapitalize="none"
                />
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ color: '#C1C1C1' }}
                />
              </Item>
              <ValidationMessage>{errors.username}</ValidationMessage>
              <Text style={styles.titlePW}>{i18n.t('FinCCP::CcpAccount.EnterANewPassword')}</Text>
              <Item style={styles.inputID}>
                <Input
                  style={{ height: 40 }}
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
              <ValidationMessage>{errors.password}</ValidationMessage>
              <View style={styles.btLogin}>
                <Button
                  style={styles.buttonLogin}
                  abpButton
                  onPress={() => navigation.navigate('SuccessFirstLogin')}>
                  <Text style={{ textTransform: 'none' }}>
                    {i18n.t('FinCCP::CcpAccount.ChangePassword')}
                  </Text>
                </Button>
              </View>
            </Form>
          )}
        </Formik>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

FirstLogin.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  fetchAppConfig: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: FirstLogin,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    fetchAppConfig: AppActions.fetchAppConfigAsync,
    setToken: PersistentStorageActions.setToken,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    marginTop: '10%',
    width: '80%',
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
    fontWeight: 'bold',
    lineHeight: 24,
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
  passwordcolor: {
    color: '#636363',
  },
  btLogin: { marginTop: 20, alignItems: 'center', paddingBottom: 25 },
  Logo: { width: 112, maxHeight: 112, resizeMode: 'stretch', marginTop: '25%', marginBottom: 25 },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  inputID: { borderWidth: 1, width: '90%', marginLeft: '5%', marginTop: 0, marginBottom: 10 },
  titleID: { marginLeft: '5%', marginTop: '5%', opacity: 0.5 },
  titlePW: { marginLeft: '5%', opacity: 0.5 },
  phone: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5,
  },
  requestPW: { fontSize: 16, fontWeight: 'normal', color: '#AEAEAE', lineHeight: 24 },
});
