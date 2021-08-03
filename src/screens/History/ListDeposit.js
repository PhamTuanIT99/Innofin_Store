import React, { useState, useEffect, useCallback } from 'react';

import i18n from 'i18n-js';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import api from '../../api/API';
import { getEnvVars } from '../../../Environment';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getHistoryCollection } from '../../api/HistoryAPI';
import moment from 'moment';
import { getHistoryDepositPage } from '../../api/HistoryAPI';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

  const fetchUser = () => {
    getHistoryCollection().then(data => {
      setDataSource(data.cashDeposits || {});
    });
  };
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, []),
  );
  useEffect(() => getData(), []);

  const getData = () => {
    setLoading(true);
    getHistoryDepositPage(offset)
      .then(data => {
        setOffset(offset + 1);
        setDataSource([...dataSource, ...data.cashDeposits]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // const renderFooter = () => {
  //   return (
  //     <View style={styles.footer}>
  //       {loading ? <ActivityIndicator color="grey" style={{ paddingBottom: 10 }} /> : null}
  //     </View>
  //   );
  // };
  const navigation = useNavigation();

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          var DataDeposit = item;
          navigation.navigate('DetailDeposit', { DataDeposit })
        }}>
        <View style={{ flex: 1 }}>
          <View style={styles.textBold}>
            {item.processStatus == 0 ? (
              <View style={styles.styleStatus}>
                <Text style={styles.textStatus}>{i18n.t('FinCCP::CcpHistory.Pending')}</Text>
                <View style={styles.styleIcon}>
                  <Image
                    source={require('../../../assets/pending.png')}
                    style={styles.iconDeposit}
                  />
                </View>
              </View>
            ) : item.processStatus == 1 ? (
              <View style={styles.styleStatus}>
                <Text style={styles.textStatus1}>
                  {i18n.t('FinCCP::CcpHistory.SuccessfullyLoadedPoints')}
                </Text>
                <View style={styles.styleIcon}>
                  <Image
                    source={require('../../../assets/successHistory.png')}
                    style={styles.iconDeposit}
                  />
                </View>
              </View>
            ) : item.processStatus == -1 ? (
              <View style={styles.styleStatus}>
                <Text style={styles.textStatus2}>{i18n.t('FinCCP::CcpHistory.Cancelled')}</Text>
                <View style={styles.styleIcon}>
                  <Image
                    source={require('../../../assets/cancel.png')}
                    style={styles.iconDeposit}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.styleStatus}>
                <Text style={styles.textStatus2}>
                  {i18n.t('FinCCP::CcpHistory.PointLoadingFailed')}
                </Text>
                <View style={styles.styleIcon}>
                  <Image
                    source={require('../../../assets/delete.png')}
                    style={styles.iconDeposit}
                  />
                </View>
              </View>
            )}
          </View>
          <Text style={styles.textbot}>
            {i18n.t('FinCCP::CcpHistory.Point')}:{' '}
            <Text style={styles.point}>
              {item.point.toLocaleString('en-US')}{' '}
              <Text style={styles.point1}>{i18n.t('FinCCP::CcpAccount.Point')}</Text>
            </Text>
          </Text>
          <Text numberOfLines={1} style={(styles.textBold, styles.textbot)}>
            {i18n.t('FinCCP::CcpHistory.RequestTime')}:{' '}
            {new Date(item.requestTime).toLocaleTimeString('vi-VN', {
              hour: 'numeric',
              minute: 'numeric',
            })}
            {',  '}
            {moment(item.requestTime).format('DD/MM/yy')}
          </Text>
          {item.processStatus == 0 ? null : item.processStatus == -1 ? (
            <Text numberOfLines={1} style={(styles.textBold, styles.textbot)}>
              {i18n.t('FinCCP::CcpHistory.CancellationTime')}:{' '}
              {new Date(item.processTime).toLocaleTimeString('vi-VN', {
                hour: 'numeric',
                minute: 'numeric',
              })}
              {',  '}
              {moment(item.processTime).format('DD/MM/yy')}
            </Text>
          ) : (
            <Text numberOfLines={1} style={(styles.textBold, styles.textbot)}>
              {i18n.t('FinCCP::CcpHistory.ConfirmationTime')}:{' '}
              {new Date(item.processTime).toLocaleTimeString('vi-VN', {
                hour: 'numeric',
                minute: 'numeric',
              })}
              {',  '}
              {moment(item.processTime).format('DD/MM/yy')}
            </Text>
          )}
          <Text numberOfLines={1} style={styles.textbot}>
            {i18n.t('FinCCP::CcpHistory.TradingCode')}: {item.code}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000);
    getHistoryDepositPage(offset)
      .then(data => {
        setOffset(offset + 1);
        setDataSource([...dataSource, ...data.cashDeposits]);
      })
      .then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {dataSource !== undefined && dataSource.length > 0 ? (
          <FlatList
            // ListFooterComponent={() => renderFooter}
            onEndReached={getData}
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            renderItem={ItemView}
            onEndReachedThreshold={0.01}
          />
        ) : (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={[{ key: '1', title: i18n.t('FinCCP::CcpHistory.PointLoadingNotHaveAHistory') }]}
            renderItem={({ item }) => <Text style={styles.datanull}>{item.title}</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  item: {
    width: '94%',
    maxHeight: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: '3%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textBold: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textbot: { fontWeight: 'normal', fontSize: 16, color: '#636363' },
  datanull: { marginVertical: 10, marginHorizontal: 15, fontWeight: 'bold', color: '#636363' },
  point: { fontWeight: 'bold', fontSize: 16, color: '#636363' },
  point1: {
    textTransform: 'lowercase',
    color: '#636363',
  },
  styleStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  textStatus: { color: '#2CD1F8', fontWeight: 'bold', fontSize: 16 },
  textStatus1: { color: 'green', fontWeight: 'bold', fontSize: 16 },
  textStatus2: { color: 'red', fontWeight: 'bold', fontSize: 16 },
  iconstyle: { marginLeft: 5, marginTop: 2 },
  iconDeposit: { width: 25, height: 25 },
  styleIcon: { position: 'absolute', top: 0, right: 0 },
});

export default App;
