import { Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, Modal, Pressable, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { takeRequest } from '../../api/HistoryAPI';
import { getEnvVars } from '../../../Environment';
import AlertComponent from '../../components/Alert/AlertComponet';
import { TouchableOpacity } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import moment from 'moment';

function DetailDeposit() {
  const route = useRoute();
  const { id, processStatus, point, requestTime, processTime, reason, images, code } =
    route.params.DataDeposit;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [alertCancel, setAlertCancel] = useState(false);
  const Alertcancel = () => {
    setAlertCancel(!alertCancel);
    takeRequest(id);
    navigation.navigate('History');
  };
  let uriImage = images;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <Text>
          {processStatus == 0 ? (
            <Text style={styles.content}>
              {i18n.t('FinCCP::CcpHistory.Status')}:
              <Text style={styles.text0}> {i18n.t('FinCCP::CcpHistory.Pending')}</Text>
            </Text>
          ) : processStatus == 1 ? (
            <Text style={styles.content}>
              {i18n.t('FinCCP::CcpHistory.Status')}:
              <Text style={styles.text1}>
                {' '}
                {i18n.t('FinCCP::CcpHistory.SuccessfullyLoadedPoints')}
              </Text>
            </Text>
          ) : processStatus == -1 ? (
            <Text style={styles.content}>
              {i18n.t('FinCCP::CcpHistory.Status')}:
              <Text style={styles.text2}> {i18n.t('FinCCP::CcpHistory.Cancelled')}</Text>
            </Text>
          ) : (
            <Text style={styles.content}>
              {i18n.t('FinCCP::CcpHistory.Status')}:
              <Text style={styles.text2}> {i18n.t('FinCCP::CcpHistory.PointLoadingFailed')}</Text>
            </Text>
          )}
        </Text>
        <Text numberOfLines={1} style={styles.content}>
          {i18n.t('FinCCP::CcpHistory.Point')}:{' '}
          <Text style={styles.address}>
            {point.toLocaleString('en-US')}{' '}
            <Text style={styles.point1}>{i18n.t('FinCCP::CcpAccount.Point')}</Text>
          </Text>
        </Text>
        <Text numberOfLines={1} style={styles.content}>
          {i18n.t('FinCCP::CcpHistory.RequestTime')}:{' '}
          {new Date(requestTime).toLocaleTimeString('vi-VN', {
            hour: 'numeric',
            minute: 'numeric',
          })}
          {', '}
          {moment(requestTime).format('DD/MM/yy')}
        </Text>
        {processStatus == 0 ? null : processStatus == -1 ? (
          <Text numberOfLines={1} style={styles.content}>
            {i18n.t('FinCCP::CcpHistory.CancellationTime')}:{' '}
            {new Date(processTime).toLocaleTimeString('vi-VN', {
              hour: 'numeric',
              minute: 'numeric',
            })}
            {', '}
            {moment(processTime).format('DD/MM/yy')}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.content}>
            {i18n.t('FinCCP::CcpHistory.ConfirmationTime')}:{' '}
            {new Date(processTime).toLocaleTimeString('vi-VN', {
              hour: 'numeric',
              minute: 'numeric',
            })}
            {', '}
            {moment(processTime).format('DD/MM/yy')}
          </Text>
        )}
        <Text numberOfLines={1} style={styles.content}>
          {i18n.t('FinCCP::CcpHistory.TradingCode')}: {code}
        </Text>
        {processStatus == 2 ? (
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpHistory.Reason')}: {reason}
          </Text>
        ) : null}
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {images !== '' ? (
              <View>
                <Text style={styles.content}>{i18n.t('FinCCP::CcpHistory.Proof')}:</Text>
                <Image style={styles.image} source={{ uri: uriImage }} />
              </View>
            ) : (
              <View style={{ marginBottom: 10 }}></View>
            )}
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <TouchableOpacity
                style={styles.clickImage}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={require('../../../assets/deleteimage.png')}
                  style={styles.icongoBack}
                />
              </TouchableOpacity>
              <View style={styles.imageZoom}>
                <ReactNativeZoomableView
                  maxZoom={1.5}
                  minZoom={0.5}
                  zoomStep={0.5}
                  initialZoom={1}
                  bindToBorders={true}
                  captureEvent={true}>
                  <Image style={styles.imageZoom} source={{ uri: uriImage }} />
                </ReactNativeZoomableView>
              </View>
            </View>
          </Modal>
        </View>
        {processStatus == 0 ? (
          <View>
            <TouchableOpacity style={styles.cancel} onPress={() => setAlertCancel(true)}>
              <Text style={styles.textCancel}>
                {i18n.t('FinCCP::CcpHistory.CancelTheRequestToTopUpPoints')}
              </Text>
            </TouchableOpacity>
            <AlertComponent
              visible={alertCancel}
              title={i18n.t('FinCCP::CcpHistory.ConrfimMessageRequestDeposit')}
              button1={() => setAlertCancel(!alertCancel)}
              button2={() => Alertcancel()}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

export default DetailDeposit;

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    flex: 1,
    maxHeight: '100%',
    width: '94%',
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 10,
    marginHorizontal: '3%',
    marginTop: '3%',
    marginBottom: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  point1: {
    textTransform: 'lowercase',
    color: '#636363',
  },
  address: { marginBottom: 10, fontSize: 16, fontWeight: 'bold', color: '#636363' },
  content: {
    fontSize: 16,
    color: '#636363',
  },
  cancel: {
    height: 55,
    width: '80%',
    backgroundColor: '#dc1e1e',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textCancel: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
    marginVertical: '2%',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 3,
  },
  text0: { fontWeight: 'bold', color: '#2CD1F8' },
  text1: { fontWeight: 'bold', color: 'green' },
  text2: { fontWeight: 'bold', color: 'red' },
  imageZoom: { width: '100%', height: '100%' },
  clickImage: { position: 'absolute', top: 30, right: 20, zIndex: 11 },
  icongoBack: { width: 30, height: 30 },
});
