import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Label, Text, Item, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import { forgotpassword } from '../../api/IdentityAPI';
import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import LoadingActions from '../../store/actions/LoadingActions';

function Forgotpassword({ startLoading, stopLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  let data = {
    email: email,
    appName: 'MVC',
    returnUrl: '',
    returnUrlHash: '',
  };
  return (
    <ImageBackground source={require('../../../assets/Rectangle-76.png')} style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? -150 : -140}
          enabled
          style={{ flex: 1, width: '100%', height: '100%' }}
          behavior={Platform.OS === 'ios' ? 'position' : 'position'}>
          <View style={{ alignContent: 'center', marginTop: '30%' }}>
            <Image style={styles.Logo} source={require('../../../assets/ForgotPassword.png')} />
            <Label style={styles.collection}>{i18n.t('FinCCP::CcpAccount.PasswordReset')}</Label>
            <Label style={styles.requestPW}>{i18n.t('FinCCP::CcpForgotPassword.Tutorial')}</Label>
            <Formik>
              <Form style={styles.login}>
                <Text style={styles.titleID}>{i18n.t('FinCCP::CcpForgotPassword.Email')}</Text>
                <Item style={styles.inputID}>
                  <Input
                    style={{ height: 40 }}
                    secureTextEntry={showPassword}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={email => setEmail(email)}
                    value={email}
                  />
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ color: '#C1C1C1' }}
                  />
                </Item>
                <View style={styles.btLogin}>
                  <Button
                    style={styles.buttonLogin}
                    abpButton
                    onPress={() => {
                      startLoading({ key: 'forgot' }),
                        forgotpassword(data)
                          .then(data => {
                            if (data.error) {
                            } else {
                              navigation.navigate('SuccessForgotPassword');
                            }
                          })
                          .finally(() => stopLoading({ key: 'forgot' }));
                    }}>
                    <Text style={{ textTransform: 'none' }}>
                      {i18n.t('FinCCP::CcpAccount.PasswordReset')}
                    </Text>
                  </Button>
                </View>
              </Form>
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
Forgotpassword.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};
export default connectToRedux({
  component: Forgotpassword,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
const styles = StyleSheet.create({
  container: {
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  button: { marginTop: 20, alignItems: 'center' },
  inputStyle: { marginVertical: 20 },
  Logo: { width: 112, maxHeight: 112, resizeMode: 'stretch', marginBottom: 25, marginLeft: '35%' },
  collection: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
  },
  requestPW: {
    width: '99%',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#AEAEAE',
    lineHeight: 20,
    textAlign: 'center',
  },
  inputID: { borderWidth: 1, width: '90%', marginLeft: '5%', marginTop: 0, marginBottom: 10 },
  titleID: { marginLeft: '5%', marginTop: '5%', opacity: 0.5 },
  login: {
    marginLeft: '5%',
    marginTop: '10%',
    width: '90%',
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
  btLogin: { marginTop: 20, alignItems: 'center', paddingBottom: 25 },
  buttonLogin: {
    backgroundColor: '#2CD1F8',
    width: '90%',
    borderRadius: 8,
    textTransform: 'none',
  },
});
