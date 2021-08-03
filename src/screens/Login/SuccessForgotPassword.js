import { Button, Label } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

function SuccessForgotPassword() {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.ctnImage} source={require('../../../assets/Rectangle-76.png')}>
      <Image style={styles.Logo} source={require('../../../assets/success.png')} />
      <Label style={styles.collection}>
        {i18n.t('FinCCP::CcpAccount.ResetPasswordSuccessfully')}
      </Label>
      <Label style={styles.requestPW}>
        {i18n.t('FinCCP::CcpForgotPassword.PasswordSentToEmail')}
      </Label>
      <Button onPress={() => navigation.navigate('Login')} style={styles.buttonLogin} abpButton>
        <Text style={styles.textLogin}>{i18n.t('FinCCP::CcpLogin.LoginAgain')}</Text>
      </Button>
    </ImageBackground>
  );
}

export default SuccessForgotPassword;
const styles = StyleSheet.create({
  ctnImage: { flex: 1, resizeMode: 'cover', alignItems: 'center' },
  Logo: { width: 112, maxHeight: 112, resizeMode: 'stretch', marginTop: '25%', marginBottom: 20 },
  collection: { fontSize: 18, fontWeight: 'bold', lineHeight: 24 },
  requestPW: {
    width: '99%',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#AEAEAE',
    lineHeight: 20,
    textAlign: 'center',
    paddingVertical:20
  },
  buttonLogin: {
    backgroundColor: '#2CD1F8',
    width: '90%',
    borderRadius: 8,
    textTransform: 'none',
  },
  textLogin: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
});
