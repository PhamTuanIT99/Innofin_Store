import React, { useState, useCallback } from 'react';
import i18n from 'i18n-js';
import { ListItem, Text, Left, Body } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { connectToRedux } from '../../utils/ReduxConnect';
import { getProfileDetail } from '../../api/IdentityAPI';
import { ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function UsersScreen() {
  const [user, setUser] = useState({});
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

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.containerImageBgr}
        source={require('../../../assets/Rectangle-71.png')}>
        {user == undefined ? (
          <View>
            <Text style={styles.title}>Loading...</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail')}>
            <View>
              <Image style={styles.image} source={require('../../../assets/user.png')} />
            </View>
            <View style={styles.textView}>
              <Text numberOfLines={1} style={styles.title}>
                {user.surname} {user.name}
                {user.verify == 1 ? (
                  <Image
                    style={styles.iconVerify}
                    source={require('../../../assets/verifyidentity.png')}
                  />
                ) : null}
              </Text>
              <Text style={styles.point}>
                {i18n.t('FinCCP::CcpAccount:PhoneNumber')}: {user.phoneNumber}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <View style={styles.styleSDTK}>
          <View
            style={[
              styles.box,
              {
                transform: [{ translateY: -40 }],
              },
            ]}>
            {user.point == undefined ? (
              <ListItem noIndent style={styles.list}>
                <Text style={styles.text}>
                  {i18n.t('FinCCP::CcpAccount.PointsAccountBalance')}:{' '}
                </Text>
              </ListItem>
            ) : (
              <View>
                <View style={styles.addDeposit}>
                  <Text style={styles.textTK}>
                    {i18n.t('FinCCP::CcpAccount.PointsAccountBalance')}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.stylePoint}>{user.point.toLocaleString('en-US')} </Text>
                  <Text style={styles.textPoint}>{i18n.t('FinCCP::CcpAccount.Point')}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <ListItem
            noIndent
            icon
            style={styles.list}
            onPress={() => navigation.navigate('Statistical')}>
            <Left>
              <Image style={styles.styleIcon} source={require('../../../assets/Statistical.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={{ color: '#636363' }}>
                {i18n.t('FinCCP::CcpStatistical.Statistical')}
              </Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            icon
            style={styles.list}
            onPress={() => navigation.navigate('ReportProblem')}>
            <Left>
              <Image style={styles.styleIcon} source={require('../../../assets/canhbao.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={{ color: '#636363' }}>{i18n.t('FinCCP::CcpReport.ReportProblem')}</Text>
            </Body>
          </ListItem>
          <ListItem
            noIndent
            icon
            style={styles.list}
            onPress={() => navigation.navigate('Setting')}>
            <Left>
              <Image style={styles.styleIcon} source={require('../../../assets/setting.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={{ color: '#636363' }}>{i18n.t('AbpSettingManagement::Settings')}</Text>
            </Body>
          </ListItem>
          <View style={styles.lineHeight}></View>
          <ListItem
            noIndent
            icon
            style={styles.list}
            onPress={() => {
              Linking.openURL('tel:0981163379');
            }}>
            <Left>
              <Image style={styles.styleIcon} source={require('../../../assets/phonecall.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={styles.textphone}>
                {i18n.t('FinCCP::CcpAccount.EmergencyNotification')}
              </Text>
              <Text style={styles.sdt}>0981163379</Text>
            </Body>
          </ListItem>
          <Text style={styles.textdown}>{i18n.t('FinCCP::CcpAccount.Tutorial')}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default connectToRedux({
  component: UsersScreen,
});
const styles = StyleSheet.create({
  containerImageBgr: { height: 200, width: '100%' },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  list: {
    height: 55,
    borderColor: 'grey',
    marginVertical: 5,
  },
  bodyStyle: {
    borderBottomWidth: null,
  },
  textphone: {
    fontSize: 18,
    color: '#636363',
  },
  textdown: {
    marginLeft: 20,
    marginTop: 10,
    fontStyle: 'italic',
    color: '#AEAEAE',
    width: '90%',
    paddingBottom: 10,
  },
  box: {
    height: 120,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
  },
  image: { width: 65, height: 65, marginRight: 20 },
  title: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  point: { fontSize: 15, color: 'white' },
  textTK: { fontSize: 18, lineHeight: 30, fontWeight: 'bold' },
  sdt: { color: '#ED822E', fontSize: 18, lineHeight: 25, fontWeight: 'bold' },
  styleIcon: { width: 55, height: 55 },
  stylePoint: { color: '#C52AFE', fontSize: 30, fontWeight: 'bold', lineHeight: 45 },
  textPoint: { lineHeight: 53, textTransform: 'lowercase', fontSize: 16 },
  lineHeight: {
    width: '90%',
    height: 2,
    backgroundColor: '#DDDDDD',
    marginHorizontal: '5%',
    marginTop: 8,
    marginBottom: 10,
  },
  textView: { width: 230 },
  styleSDTK: { alignItems: 'center', height: 85 },
  verify: { flexDirection: 'row', alignItems: 'center' },
  iconVerify: { width: 15, height: 15, resizeMode: 'contain' },
  scroll: { height: '100%' },
  addDeposit: { flexDirection: 'row', alignItems: 'center' },
});
