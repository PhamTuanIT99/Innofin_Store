import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { getEnvVars } from '../../../Environment';
import api from '../../api/API';
import i18n from 'i18n-js';
import { getHistoryStatisticalPage } from '../../api/IdentityAPI';

export default function DateTimePickerTester() {
  const [visibility, setvisibility] = useState(false);
  const [visibility1, setvisibility1] = useState(false);
  const [DateDisplay, setDateDisplay] = useState(new Date());
  const [DateDisplay1, setDateDisplay1] = useState(new Date());
  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const FromDate = moment(DateDisplay).format('yy/MM/DD');
  const ToDate = moment(DateDisplay1).format('yy/MM/DD');
  const handleConfirm = date => {
    setvisibility(false);
    setDateDisplay(date);
  };
  const onPressCancel = () => {
    setvisibility(false);
  };
  const onPressShow = () => {
    setvisibility(true);
  };
  const handleConfirm1 = date => {
    setvisibility1(false);
    setDateDisplay1(date);
  };
  const onPressCancel1 = () => {
    setvisibility1(false);
  };
  const onPressShow1 = () => {
    setvisibility1(true);
  };
  const fetchUser = () => {
    setRefreshing(true);
    wait(0);
    getHistoryStatisticalPage(FromDate, ToDate)
      .then(data => {
        setDataSource(data);
        setRefreshing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => fetchUser(), []);
  const navigation = useNavigation();
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('DetailCollector', { item });
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
            <Text style={styles.styleStatus1}>
              {i18n.t('FinCCP::CcpCollection.CompletedCollection')}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const check = () => {
    if (DateDisplay.getTime() <= DateDisplay1.getTime()) {
      fetchUser();
    } else {
      Alert.alert(
        i18n.t('FinCCP::CcpStatistical.PleaseRetype'),
        i18n.t('FinCCP::CcpStatistical.Error'),
        [{ text: 'OK' }],
      );
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container1}>
        <View>
          <View style={styles.viewDate}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>{i18n.t('FinCCP::CcpStatistical.From')}</Text>
              <TouchableOpacity style={styles.datetime} onPress={onPressShow}>
                <Text style={{ fontWeight: 'bold' }}>{DateDisplay ? moment(DateDisplay).format('DD/MM/yy') : DateDisplay}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>{i18n.t('FinCCP::CcpStatistical.To')}</Text>
              <TouchableOpacity style={styles.datetime} onPress={onPressShow1}>
                <Text style={{ fontWeight: 'bold' }}>{DateDisplay1 ? moment(DateDisplay1).format('DD/MM/yy') : DateDisplay1}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loc} onPress={check}>
              <Image style={styles.iconLoc} source={require('../../../assets/iconLoc.png')} />
              <Text>{i18n.t('FinCCP::CcpStatistical.Filter')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.styleTT}>
            <Text numberOfLines={1} style={styles.point1}>
              {i18n.t('FinCCP::CcpStatistical.Totalincome')}:{' '}
              <Text style={{ color: '#C52AFE' }}>
                {dataSource.totalMoney == undefined
                  ? 0
                  : dataSource.totalMoney.toLocaleString('en-US')}
              </Text>{' '}
              VNĐ
            </Text>
          </View>
          <View style={styles.container}>
            {dataSource.cashCollection !== undefined && dataSource.cashCollection.length > 0 ? (
              <FlatList
                onRefresh={fetchUser}
                refreshing={refreshing}
                data={dataSource.cashCollection}
                extraData={dataSource}
                keyExtractor={(item, index) => index.toString()}
                enableEmptySections={true}
                renderItem={ItemView}
              />
            ) : (
              <FlatList
                onRefresh={fetchUser}
                refreshing={refreshing}
                data={[{ key: '1', title: i18n.t('FinCCP::CcpHistory.NoCollectionHistory') }]}
                renderItem={({ item }) => <Text style={styles.datanull}>{item.title}</Text>}
              />
            )}
          </View>
        </SafeAreaView>
        <DateTimePicker
          onDateChange={setDateDisplay}
          isVisible={visibility}
          onConfirm={handleConfirm}
          onCancel={onPressCancel}
          maximumDate={new Date()}
          mode="date"
        />
        <DateTimePicker
          isVisible={visibility1}
          onDateChange={setDateDisplay1}
          onConfirm={handleConfirm1}
          onCancel={onPressCancel1}
          maximumDate={new Date()}
          mode="date"
        />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container1: { flex: 1, backgroundColor: '#FBFBFD' },
  datetime: { borderWidth: 1, borderColor: '#BEBEBE', paddingHorizontal: 13, borderRadius: 5 },
  title: { marginRight: 5, fontSize: 16 },
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
  point1: { fontSize: 16, fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 15 },
  loc: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 3,
  },
  styleTT: {
    borderBottomWidth: 1,
    borderColor: '#BEBEBE',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconLoc: { width: 18, height: 18, resizeMode: 'stretch' },
  viewDate: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 2 },
});
