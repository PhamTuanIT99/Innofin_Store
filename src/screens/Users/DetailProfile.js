import React, { useCallback, useState } from 'react';
import { ListItem, Text, Body } from 'native-base';
import { StyleSheet, ImageBackground, View, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getProfileDetail } from '../../api/IdentityAPI';
import i18n from 'i18n-js';
import { Platform } from 'react-native';
import { Image } from 'react-native';
import { GetCities } from '../../api/LocationAPI';
import moment from 'moment';
import { ScrollView } from 'react-native';

function DetailProfile() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [Cities, SetCities] = useState({});

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
  const FetchCities = () => {
    GetCities().then(data => {
      SetCities(data || {});
    });
  };
  useFocusEffect(
    useCallback(() => {
      FetchCities();
    }, []),
  );
  return user.point == undefined ? (
    <ImageBackground
      style={styles.bgrContainer}
      source={require('../../../assets/Rectangle-76.png')}
    />
  ) : (
    <ImageBackground
      style={styles.bgrContainer}
      source={require('../../../assets/Rectangle-76.png')}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
      <ScrollView>
        <View style={{ width: '98%', marginLeft: '1%' }}>
          <View style={styles.styleCard}>
            <View style={styles.styleCTN}>
              <View style={{ marginRight: 20 }}>
                <Image style={styles.iconUser} source={require('../../../assets/user.png')} />
              </View>
              <View style={{ width: '65%' }}>
                <Text numberOfLines={1} style={styles.styleName}>
                  {user.surname} {user.name}
                </Text>
                {user.verify == 1 ? (
                  <View style={styles.viewVerify}>
                    <Text style={styles.textVerify}>{i18n.t('AbpAccount::Verified')}</Text>
                    <Image
                      style={[styles.iconVerify, { marginLeft: 5 }]}
                      source={require('../../../assets/verifyidentity.png')}
                    />
                  </View>
                ) : (
                  <View style={styles.viewVerify}>
                    <Text style={styles.noVerify}>{i18n.t('AbpAccount::NotVerified')}</Text>
                    <Image
                      style={styles.iconVerify}
                      source={require('../../../assets/delete.png')}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.ctnText}>
              <Text>{i18n.t('FinCCP::CcpAccount.PointsAccountBalance')} </Text>
              <Text style={styles.stylePoint}>{user.point.toLocaleString('en-US')} </Text>
              <Text style={{ textTransform: 'lowercase' }}>
                {i18n.t('FinCCP::CcpAccount.Point')}
              </Text>
            </Text>
          </View>
          <View style={styles.userCard}>
            <ListItem noIndent style={styles.list}>
              <Body style={styles.bodyStyle}>
                <Text>
                  <Text>{i18n.t('FinCCP::CcpProfile.dateOfBirth')}: </Text>
                  <Text style={styles.textFw}>{moment(user.dateOfBirth).format('DD/MM/yy')}</Text>
                </Text>
              </Body>
            </ListItem>
            <ListItem noIndent style={styles.list}>
              <Body style={styles.bodyStyle}>
                <Text>
                  <Text>{i18n.t('FinCCP::CcpProfile.idCard')}: </Text>
                  <Text style={styles.textFw}>{user.identityNumber}</Text>
                </Text>
              </Body>
            </ListItem>
            <ListItem noIndent style={styles.list}>
              <Body style={styles.bodyStyle}>
                <Text>
                  <Text>{i18n.t('FinCCP::CcpAccount:PhoneNumber')}: </Text>{' '}
                  <Text style={styles.textFw}>{user.phoneNumber}</Text>
                </Text>
              </Body>
            </ListItem>
          </View>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => navigation.navigate('Update', { Cities })}>
            <Text style={styles.textSubmit}>{i18n.t('FinCCP::CcpProfile.Update')}</Text>
          </TouchableOpacity>
          {user.verify == 1 ? null : (
            <TouchableOpacity
              style={styles.submit}
              onPress={() => navigation.navigate('ImageIndentity', { user })}>
              <Text style={styles.textSubmit}>{i18n.t('FinCCP::CcpKYC.DocumentVerification')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default DetailProfile;

const styles = StyleSheet.create({
  ctnText: { flexDirection: 'row', textAlign: 'center', padding: 20, fontSize: 16, lineHeight: 18 },
  list: { height: 60, borderColor: '#DDDDDD', borderBottomWidth: 1 },
  bodyStyle: { borderBottomWidth: null },
  userCard: {
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconUpdate: { width: 40, height: 40 },
  line: { width: '100%', height: 2, backgroundColor: '#DDDDDD', marginTop: 8 },
  styleCard: {
    marginBottom: 30,
    borderRadius: 10,
    marginTop: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  styleCTN: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingLeft: 25 },
  iconUser: { width: 65, height: 65 },
  bgrContainer: { flex: 1, alignItems: 'center' },
  textFw: { fontWeight: 'bold', fontSize: 16 },
  styleName: { fontSize: 20, fontWeight: 'bold' },
  stylePoint: { color: '#C52AFE', fontWeight: 'bold' },
  textSubmit: { fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' },
  submit: {
    paddingVertical: 16,
    paddingHorizontal: 27,
    borderRadius: 20,
    backgroundColor: '#2CD1F8',
    width: '100%',
    borderRadius: 8,
    textTransform: 'none',
    marginBottom: 30,
  },
  textVerify: { color: '#63AD4B' },
  noVerify: { color: '#ED502E' },
  iconVerify: { width: 15, height: 15 },
  viewVerify: { flexDirection: 'row', alignItems: 'center' },
});
