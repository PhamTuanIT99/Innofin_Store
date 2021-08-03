import { View, Text } from 'native-base';
import React, {  useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { GetlistNotify, GetUpdateSeenNotifi, Markallread } from '../../api/NotificationAPI'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AlertComponet from '../../components/Alert/AlertComponet'
import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import LoadingActions from '../../store/actions/LoadingActions';


function ListNofitication({ startLoading, stopLoading }) {

  const [data, setData] = useState()
  const [seen, setSeen] = useState()
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const fetchNotify = () => {
    startLoading({ key: 'markallread' })
    GetlistNotify()
      .then(data => {
        setData(data.listNotifies);
        setSeen(data.totalUnSeen);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => stopLoading({ key: 'markallread' }));
  }
  useEffect(() => fetchNotify(), []);
  const GetMarkallread = () => {
    setModalVisible(false)
    Markallread().then(data => {
      if (data.error) {
      } else {
        fetchNotify();
      }
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingVertical: 2 }}>
        {seen > 0 ?
          <TouchableOpacity style={styles.styleCheckall} onPress={() => setModalVisible(true)}>
                       <Text style={styles.checkAll}>{i18n.t('FinCCP::CcpNotification.MakeReadAll')}({seen})</Text>
          </TouchableOpacity>
          : <View style={styles.styleCheckall}>
            <Text style={[styles.checkAll, { color: 'grey' }]}>{i18n.t('FinCCP::CcpNotification.MakeReadAll')}</Text>
          </View>
        }
        <AlertComponet
          visible={modalVisible}
          title={i18n.t('FinCCP::CcpNotify.MarkAllRead')}
          button1={() => setModalVisible(!modalVisible)}
          button2={() => GetMarkallread()}
        />
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={fetchNotify}
        data={data}
        extraData={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => {
            switch (item.actionType) {
              case 0:
                var DataDeposit = item.cashDepositResult;
                GetUpdateSeenNotifi(item.id).then(result => {
                  navigation.navigate('DetailDeposit', { DataDeposit });
                });
                break;
              case 1:
                var Data = item.cashCollectionResult
                GetUpdateSeenNotifi(item.id).then(result => {
                  navigation.navigate('Collection', { Data });
                });
                break;
            }
          }}>
            {item.seen == false ?
              <View style={{ flex: 1 }}>
                <View style={styles.notify}></View>
                <Text numberOfLines={1} style={styles.textBold}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.address}>{item.body}</Text>
                <Text numberOfLines={1} style={styles.receivable}>{new Date(item.time).toLocaleTimeString('vi-VN', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                  {', '}
                  {moment(item.time).format('DD/MM/yy')}
                </Text>
              </View>
              : <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.textBold}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.address}>{item.body}</Text>
                <Text numberOfLines={1} style={styles.receivable}>{new Date(item.time).toLocaleTimeString('vi-VN', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                  {', '}
                  {moment(item.time).format('DD/MM/yy')}
                </Text>
              </View>
            }

          </TouchableOpacity>
        )}
      />

    </SafeAreaView>

  );
}

ListNofitication.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};
export default connectToRedux({
  component: ListNofitication,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  item: {
    width: '94%',
    maxHeight: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: '3%',
    borderColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 5,
    marginBottom: 5

  },
  address: { opacity: 0.5, fontSize: 16 },
  textBold: { fontSize: 16, fontWeight: 'bold' },
  time: { marginBottom: '10%' },
  textAll: { textAlign: 'center', color: '#21409a', fontSize: 15 },
  receivable: { fontSize: 16 },
  notify: { width: 8, height: 8, borderRadius: 10, backgroundColor: '#C52AFE', position: 'absolute', top: 0, right: 0 },
  checkAll: { paddingVertical: 4, paddingRight: 10, fontStyle: 'italic', fontSize: 16 },
  styleCheckall: { position: 'absolute', right: 0 }
});
