import React, { useState, useEffect, useCallback } from 'react';
import i18n from 'i18n-js';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import api from '../../api/API';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getMyProcessCollection } from '../../api/CollectionAPI';
import { getEnvVars } from '../../../Environment';
import { getHistoryCollection } from '../../api/HistoryAPI';
import moment from 'moment';
import { getHistoryPage } from '../../api/HistoryAPI';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);

  const fetchUser = () => {
    getHistoryCollection().then(data => {
      setDataSource(data.cashCollections || {});
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
    getHistoryPage(offset)
      .then(data => {
        setOffset(offset + 1);
        setDataSource([...dataSource, ...data.cashCollection]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const navigation = useNavigation();
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (item.processStatus !== 4 && item.processStatus !== -1) {
            getMyProcessCollection().then(data => {
              navigation.navigate('StartCollection', { data });
            });
          } else navigation.navigate('DetailCollector', { item });
        }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textBold}>{item.storeName}</Text>
          <Text style={styles.address}>{item.storeAddress}</Text>
          <Text style={styles.point}>
            <Text style={styles.textbot}>
              {i18n.t('FinCCP::CcpCollection.AmountNeedCollecting')}:{' '}
            </Text>
            {item.total.toLocaleString('en-US')} VNĐ
          </Text>
          <Text numberOfLines={1} style={(styles.textBold, styles.textbot)}>
            {i18n.t('FinCCP::CcpHistory.CollectionTime')}:{' '}
            {new Date(item.processTime).toLocaleTimeString('vi-VN', {
              hour: 'numeric',
              minute: 'numeric',
            })}
            {', '}
            {moment(item.processTime).format('DD/MM/yy')}
          </Text>
          <Text style={(styles.textBold, styles.textbot)}>
            {i18n.t('FinCCP::CcpHistory.Status')}:{' '}
            {item.processStatus == 1 ? (
              <Text style={styles.styleStatus2}>{i18n.t('FinCCP::CcpCollection.StartMoving')}</Text>
            ) : item.processStatus == 2 ? (
              <Text style={styles.styleStatus2}>
                {i18n.t('FinCCP::CcpCollection.StartCollection')}
              </Text>
            ) : item.processStatus == 3 ? (
              <Text style={styles.styleStatus2}>
                {i18n.t('FinCCP::CcpHistory.RequestToEditStatement')}
              </Text>
            ) : item.processStatus == 4 ? (
              <Text style={styles.styleStatus1}>
                {i18n.t('FinCCP::CcpCollection.CompletedCollection')}
              </Text>
            ) : item.processStatus == -1 ? (
              <Text style={styles.styleStatus}>
                {i18n.t('FinCCP::CcpHistory.CancellationofTheCollectionOrder')}
              </Text>
            ) : (
              ''
            )}
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
    wait(0);
    getHistoryPage(offset)
      .then(data => {
        setOffset(offset + 1);
        setDataSource([...dataSource, ...data.cashCollection]);
      })
      .then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {dataSource !== undefined && dataSource.length > 0 ? (
          <FlatList
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
            data={[{ key: '1', title: i18n.t('FinCCP::CcpHistory.NoCollectionHistory') }]}
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
  textBold: { fontWeight: 'bold', fontSize: 18, color: '#636363' },
  address: { fontSize: 16, opacity: 0.8, color: '#636363' },
  textbot: { fontWeight: 'normal', fontSize: 16, color: '#636363' },
  datanull: { marginVertical: 10, marginHorizontal: 15, fontWeight: 'bold' },
  point: { fontWeight: 'bold', fontSize: 16, color: '#636363' },
  styleStatus: { color: 'red', fontWeight: 'bold' },
  styleStatus1: { color: 'green', fontWeight: 'bold' },
  styleStatus2: { color: '#ED822E', fontWeight: 'bold' },
});

export default App;
