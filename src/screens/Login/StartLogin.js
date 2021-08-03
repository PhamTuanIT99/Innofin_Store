import { Button, Text, View } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';

function StartLogin() {
  const saveLogin = async () => {
    try {
      await AsyncStorage.setItem('FirstTime', 'true');
      navigation.navigate('Login');
    } catch (err) {
      alert(err);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={styles.image}>
      <LinearGradient colors={['#3EEFFC', '#71ABF3', '#D689FD']} style={styles.background} />
      <Image source={require('../../../assets/innofin1.png')} />
      <Text style={styles.title}>{i18n.t('FinCCP::CcpSlash.Hello')}</Text>
      <Image style={styles.imagePoint} source={require('../../../assets/image18.png')} />
      <Button abpButton style={styles.start} onPress={() => saveLogin()}>
        <Text style={styles.textStart}>{i18n.t('FinCCP::CcpStartLogin.Start')}</Text>
      </Button>
    </View>
  );
}

export default StartLogin;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: { backgroundColor: '#2CD1F8', width: '80%', borderRadius: 8 },
  title: {
    color: 'white',
    width: '80%',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '8%',
    lineHeight: 25,
    fontSize: 16,
  },
  textStart: { fontWeight: 'bold', textTransform: 'none' },
  imagePoint: { marginBottom: '10%', width: 322, height: 202 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});
