import i18n from 'i18n-js';
import { Button, Icon, Text, View } from 'native-base';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getRequestCollection } from '../../api/CollectionAPI';
import { getProfileDetail } from '../../api/IdentityAPI';
import { useTracking } from '../../hooks/Tracking';
import PushNotification from 'react-native-push-notification';
import PushNotificationIos from '@react-native-community/push-notification-ios';
import Firebase from '../../components/PushNotify/setPushNotify';
import { PushNotify } from '../../api/NotificationAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';

function HomeScreen() {
  const [collection, setConllection] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useTracking();
  const [tokenPush, setTokenPush] = useState(null);

  const fetchconllection = () => {
    getRequestCollection().then(data => {
      setConllection(data || {});
    });
  };
  useFocusEffect(
    useCallback(() => {
      fetchconllection();
    }, []),
  );
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getTokenFirebase = async () => {
    try {
      const token = await Firebase.getTokenFirebase();
      setTokenPush(token);
    } catch (e) {
      console.log(e);
    }
  };
  const savePush = async () => {
    try {
      await AsyncStorage.setItem('FirstPush', 'true');
    } catch (err) {
      alert(err);
    }
  };
  const Pushtoken = async () => {
    AsyncStorage.getItem('FirstPush').then(result => {
      if (result === null) {
        getTokenFirebase();
        if (tokenPush !== null) {
          let deviceType = 'Android';
          if (Platform.OS === 'ios') {
            deviceType = 'iOS';
          }
          PushNotify({
            token: tokenPush,
            type: deviceType,
          }).then(({ data }) => data);
          savePush();
        }
      }
    });
  };
  Pushtoken();
  const listenNotification = () => {
    Firebase.setBackgroundMessageHandler();
  };
  useEffect(() => {
    listenNotification();
    const unsubscribe = Firebase.onMessage(dataCallBack => {
      Platform.OS === 'android'
        ? PushNotification.localNotification({
            message: dataCallBack.notification.body || '',
            title: dataCallBack.notification.title || '',
            smallIcon: dataCallBack.notification.android.imageUrl || '',
            userInfo: dataCallBack?.data || {},
          })
        : PushNotificationIos.addNotificationRequest({
            id: dataCallBack?.messageId || 0,
            body: dataCallBack?.notification.body || '',
            title: dataCallBack?.notification.title || '',
            userInfo: dataCallBack?.data || {},
          });
    });
    return unsubscribe;
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(0)
      .then(() =>
        getRequestCollection().then(data => {
          setConllection(data || {});
        }),
      )
      .then(() => setRefreshing(false));
  }, []);

  const [user, setUser] = useState({});
  const fechUser = () => {
    getProfileDetail().then(data => {
      setUser(data || {});
    });
  };

  useEffect(() => fechUser(), []);
  // useEffect(() => {
  //   if (user.userName && !tracking.tracking) {
  //     setTracking({
  //       orgname: 'innofin',
  //       username: user.userName,
  //       tracking: true,
  //     });
  //   }
  // }, [user]);
  const navigation = useNavigation();

  const refRBSheet = useRef();
  return (
    <SafeAreaView style={styles.container}>
      {collection !== undefined && collection.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={collection}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                var Data = item;
                navigation.navigate('Collection', { Data, location });
              }}>
              <View style={styles.image}>
                {item.storeLogo === '/images/logo/logo-dark.png' ? (
                  <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    source={{
                      uri: item.storeLogo,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.image1}
                    source={{
                      uri: item.storeLogo,
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.textBold}>{item.storeName}</Text>
                <Text style={styles.address} numberOfLines={1}>
                  {item.storeAddress}
                </Text>
                <Text style={styles.textNeed} numberOfLines={1}>
                  <Text style={styles.textNomal}>
                    {i18n.t('FinCCP::CcpCollection.AmountNeedCollecting')}:
                  </Text>{' '}
                  {item.total.toLocaleString('en-US')} VNĐ
                </Text>
                <Text style={styles.textTime}>
                  {i18n.t('FinCCP::CcpCollection.TimeToCollect')}:{' '}
                  <Text style={styles.textTime1}>
                    {new Date(item.requestDateTime).toLocaleTimeString('vi-VN', {
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 0,
                }}>
                <Icon name="ellipsis-horizontal-outline" style={{ fontSize: 16 }} />
                <RBSheet
                  height={180}
                  ref={refRBSheet}
                  closeOnDragDown={true}
                  closeOnPressMask={false}
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                      backgroundColor: '#000',
                    },
                  }}>
                  <View style={{ marginHorizontal: '5%' }}>
                    <TouchableOpacity
                      style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                      }}
                      onPress={() => refRBSheet.current.close()}>
                      <Icon
                        name="brush"
                        style={{ fontSize: 18, color: '#2CD1F8', marginRight: 10 }}
                      />
                      <Text>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                      }}
                      onPress={() => refRBSheet.current.close()}>
                      <Icon
                        name="close-circle"
                        style={{ fontSize: 18, color: 'red', marginRight: 10 }}
                      />
                      <Text>Huỷ bỏ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => refRBSheet.current.close()}>
                      <Icon name="close" style={{ fontSize: 18, color: 'red', marginRight: 10 }} />
                      <Text>Đóng</Text>
                    </TouchableOpacity>
                  </View>
                </RBSheet>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={[{ key: '1', title: i18n.t('FinCCP::CcpHome.noRequest') }]}
          renderItem={({ item }) => <Text style={styles.datanull}>{item.title}</Text>}
        />
      )}
      <Button
        abpButton
        style={styles.buttonLogin}
        onPress={() => navigation.push('CreateCollection')}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Thêm đơn thu hộ</Text>
      </Button>
    </SafeAreaView>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  title: {
    width: '100%',
    height: 45,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'white',
    justifyContent: 'space-around',
    marginLeft: 15,
  },
  name: { marginTop: 25, fontSize: 21 },
  item: {
    width: '94%',
    maxHeight: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: 95,
    height: 95,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image1: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  address: { opacity: 0.8, fontSize: 16, color: '#636363' },
  textBold: { fontWeight: 'bold', fontSize: 18, color: '#636363' },
  textTime: { fontSize: 16, color: '#636363' },
  textTime1: { fontSize: 16, color: '#636363', fontWeight: 'bold' },
  need: {
    fontWeight: 'bold',
    color: '#2CD1F8',
    fontSize: 16,
    shadowOffset: { width: 0, height: 1 },
  },
  textNeed: {
    fontSize: 16,
    color: '#2CD1F8',
    fontWeight: 'bold',
  },
  datanull: { marginVertical: 10, marginHorizontal: 15, fontWeight: 'bold' },
  textNomal: { fontWeight: 'normal', fontSize: 16, color: '#636363' },
  buttonLogin: {
    backgroundColor: '#2CD1F8',
    width: '94%',
    borderRadius: 8,
    textTransform: 'none',
    marginLeft: '2%',
    marginBottom: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
