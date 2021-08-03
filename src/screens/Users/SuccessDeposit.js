import { Button, Form } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

function SuccessDeposit() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.CTN}>
      <Form style={styles.container}>
        <Text style={styles.title}>{i18n.t('FinCCP::CcpDeposit.SuccessDeposit')}</Text>
        <Button style={styles.button} abpButton onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.text}>{i18n.t('FinCCP::CcpAccount.Return')}</Text>
        </Button>
      </Form>
    </SafeAreaView>
  );
}

export default SuccessDeposit;
const styles = StyleSheet.create({
  CTN:{backgroundColor: '#FBFBFD', flex: 1, alignItems: 'center'},
  container: {
    paddingVertical: 40,
    marginTop: 20,
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
    alignItems: 'center',
  },
  button: { borderRadius: 8, backgroundColor: '#2CD1F8', width: '90%' },
  text: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  title: { textAlign: 'center', width: '90%', marginBottom: 25 },
});
