import { Formik } from 'formik';
import i18n from 'i18n-js';
import { Button, Form, Input, Item, Label, Text, H1, Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import {
  Linking,
  StyleSheet,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Register } from '../../api/AccountAPI';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import * as Yup from 'yup';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';

const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
const passwordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
const RegisterSchema = Yup.object().shape({
  surname: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
  name: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
  email: Yup.string()
    .email('FinCCP::CcpRegister.EmailErrors')
    .required('FinCCP::CcpError.ThisFieldIsRequired'),
  phoneNumber: Yup.string()
    .matches(vnf_regex, 'CcpRegister.PhoneErrors')
    .required('FinCCP::CcpError.ThisFieldIsRequired'),
  userName: Yup.string().required('FinCCP::CcpError.ThisFieldIsRequired'),
  password: Yup.string()
    .required('FinCCP::CcpError.ThisFieldIsRequired')
    .matches(passwordVal, 'FinCCP::CcpRegister.PasswordNotMatch'),
  rePassword: Yup.string()
    .required('FinCCP::CcpError.ThisFieldIsRequired')
    .oneOf([Yup.ref('password')], 'FinCCP::PasswordNotFound'),
});

function RegisterScreen({ startLoading, stopLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [reShowPassword, setReShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const nameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const rePasswordRef = useRef(null);

  const submit = ({ userName, password, phoneNumber, name, surname, email }) => {
    startLoading({ key: 'Register' });
    Register({ userName, password, phoneNumber, name, surname, email })
      .then(() => {
        Alert.alert(
          i18n.t('FinCCP::CcpKYC.RegisterSuccess'),
          i18n.t('FinCCP::CcpLogin.PleaseLoginAgain'),
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('ConfirmOTP'),
            },
          ],
        );
      })
      .finally(() => stopLoading({ key: 'Register' }));
  };
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.image} source={require('../../../assets/Rectangle-76.png')}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? -250 : 0}
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : null}>
        <ScrollView>
          <View style={styles.viewForm}>
            <Image style={styles.Logo} source={require('../../../assets/ino.jpg')} />
            <Label style={styles.collection}>{i18n.t('FinCCP::CcpLogo.Collectionervice')}</Label>
            <Formik
              initialValues={{
                userName: '',
                password: '',
                phoneNumber: '',
                name: '',
                surname: '',
                email: '',
                rePassword: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={submit}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <Form style={styles.login}>
                  <Text style={styles.titleID}>{i18n.t('FinCCP::SurName')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      onChangeText={handleChange('surname')}
                      onBlur={handleBlur('surname')}
                      value={values.surname}
                      onSubmitEditing={() => nameRef.current._root.focus()}
                      returnKeyType="next"
                      autoCapitalize="none"
                    />
                    <Icon name="person" style={{ color: '#C1C1C1' }} />
                  </Item>
                  {errors.surname && touched.surname ? (
                    <ValidationMessage>{errors.surname}</ValidationMessage>
                  ) : null}
                  <Text style={styles.titlePW}>{i18n.t('FinCCP::CcpProfile.Name')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      onSubmitEditing={() => emailRef.current._root.focus()}
                      returnKeyType="next"
                      autoCapitalize="none"
                      ref={nameRef}
                    />
                    <Icon name="person" style={{ color: '#C1C1C1' }} />
                  </Item>
                  {errors.name && touched.name ? (
                    <ValidationMessage>{errors.name}</ValidationMessage>
                  ) : null}
                  <Text style={styles.titlePW}>{i18n.t('AbpAccount::EmailAddress')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      onSubmitEditing={() => phoneNumberRef.current._root.focus()}
                      returnKeyType="next"
                      autoCapitalize="none"
                      ref={emailRef}
                    />
                    <Icon name="mail-outline" style={{ color: '#C1C1C1' }} />
                  </Item>
                  {errors.email && touched.email ? (
                    <ValidationMessage>{errors.email}</ValidationMessage>
                  ) : null}
                  <Text style={styles.titlePW}>{i18n.t('FinCCP::CcpAccount:PhoneNumber')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      onSubmitEditing={() => userNameRef.current._root.focus()}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      autoCapitalize="none"
                      ref={phoneNumberRef}
                    />
                    <Icon name="call-outline" style={{ color: '#C1C1C1' }} />
                  </Item>
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <ValidationMessage>{errors.phoneNumber}</ValidationMessage>
                  ) : null}
                  <Text style={styles.titlePW}>{i18n.t('AbpAccount::UserName')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      onChangeText={handleChange('userName')}
                      onBlur={handleBlur('userName')}
                      value={values.userName}
                      onSubmitEditing={() => passwordRef.current._root.focus()}
                      returnKeyType="next"
                      autoCapitalize="none"
                      ref={userNameRef}
                    />
                    <Icon name="person" style={{ color: '#C1C1C1' }} />
                  </Item>
                  {errors.userName && touched.userName ? (
                    <ValidationMessage>{errors.userName}</ValidationMessage>
                  ) : null}
                  <Text style={styles.titlePW}>{i18n.t('AbpAccount::Password')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      ref={passwordRef}
                      value={values.password}
                      autoCapitalize="none"
                      onSubmitEditing={() => rePasswordRef.current._root.focus()}
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
                  <Text style={styles.titlePW}>{i18n.t('AbpAccount::ConfirmPassword')}</Text>
                  <Item style={styles.inputID}>
                    <Input
                      style={{ height: 45 }}
                      secureTextEntry={!reShowPassword}
                      onChangeText={handleChange('rePassword')}
                      onBlur={handleBlur('rePassword')}
                      value={values.rePassword}
                      autoCapitalize="none"
                      ref={rePasswordRef}
                    />
                    <Icon
                      name={reShowPassword ? 'eye-off' : 'eye'}
                      onPress={() => setReShowPassword(!reShowPassword)}
                      style={{ color: '#C1C1C1' }}
                    />
                  </Item>
                  {errors.rePassword && touched.rePassword ? (
                    <ValidationMessage>{errors.rePassword}</ValidationMessage>
                  ) : null}
                  <View style={styles.btLogin}>
                    <Button style={styles.buttonLogin} abpButton onPress={() => handleSubmit()}>
                      <Text>{i18n.t('AbpAccount::Register')}</Text>
                    </Button>
                  </View>
                </Form>
              )}
            </Formik>
            <TouchableOpacity
              style={styles.forgotpassword}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.passwordcolor}>{i18n.t('AbpAccount::AlreadyRegistered')}</Text>
              <Text style={styles.passwordcolor}>{i18n.t('AbpAccount::BackToLogin')}</Text>
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
    </ImageBackground>
  );
}

RegisterScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  fetchAppConfig: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: RegisterScreen,
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
    alignItems: 'center',
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
