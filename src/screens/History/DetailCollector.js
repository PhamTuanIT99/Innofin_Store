import { Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { ScrollView } from 'react-native-gesture-handler';
import { getEnvVars } from '../../../Environment';
import { TouchableOpacity } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import moment from 'moment';

function DetailCollection() {
  const route = useRoute();
  const {
    storeAddress,
    storeName,
    storeLogo,
    total,
    processTime,
    processStatus,
    verifyImages,
    grabName,
    grabPhone,
    reason,
    storePhone,
  } = route.params.item;
  const [modalVisible, setModalVisible] = useState(false);
  const uriImage = verifyImages;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <View style={styles.form}>
          <View style={styles.styleLogo}>
            {storeLogo == '/images/logo/logo-dark.png' ? (
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                source={{ uri: storeLogo }}
              />
            ) : (
              <Image style={styles.Logo} source={{ uri: storeLogo }} />
            )}
          </View>
          <Text style={styles.textBold}>
            <Text style={styles.styleName}>{i18n.t('FinCCP::CcpHistory.NameOfTheStore')}: </Text>
            {storeName}
          </Text>
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpAccount:PhoneNumber')}: {storePhone}
          </Text>
          <Text style={styles.address}>
            {i18n.t('FinCCP::CcpHistory.Address')}: {storeAddress}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpCollection.AmountNeedCollecting')}:{' '}
            <Text style={styles.point}>{total.toLocaleString('en-US')} VNĐ</Text>
          </Text>
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpCollection.Payer')}: {grabName}
          </Text>
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpAccount:PhoneNumber')}: {grabPhone}
          </Text>
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpHistory.CollectionTime')}:{' '}
            {new Date(processTime).toLocaleTimeString('vi-VN', {
              hour: 'numeric',
              minute: 'numeric',
            })}
            {', '}
            {moment(processTime).format('DD/MM/yy')}
          </Text>
          <Text style={styles.content}>
            {i18n.t('FinCCP::CcpHistory.Status')}:{' '}
            <Text style={styles.status}>
              {processStatus == 1 ? (
                i18n.t('FinCCP::CcpCollection.StartMoving')
              ) : processStatus == 2 ? (
                i18n.t('FinCCP::CcpCollection.StartCollection')
              ) : processStatus == 3 ? (
                i18n.t('FinCCP::CcpHistory.RequestToEditStatement')
              ) : processStatus == 4 ? (
                <Text style={{ color: 'green' }}>
                  {i18n.t('FinCCP::CcpCollection.CompletedCollection')}
                </Text>
              ) : processStatus == -1 ? (
                <Text style={{ color: 'red' }}>
                  {i18n.t('FinCCP::CcpHistory.CancellationofTheCollectionOrder')}
                </Text>
              ) : (
                ''
              )}
            </Text>
          </Text>
          {processStatus == -1 ? (
            <Text style={styles.content}>
              {i18n.t('FinCCP::CcpHistory.Reason')}: {reason}
            </Text>
          ) : null}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {verifyImages !== '' && processStatus !== -1 ? (
              <View>
                <Text style={styles.content}>{i18n.t('FinCCP::CcpHistory.Proof')}:</Text>
                <Image style={styles.imagevery} source={{ uri: uriImage }} />
              </View>
            ) : null}
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.clickImage}>
                <Image
                  source={require('../../../assets/deleteimage.png')}
                  style={styles.goBackimage}
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
                  <Image style={styles.imageZoom} source={{ uri: verifyImages }} />
                </ReactNativeZoomableView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

export default DetailCollection;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFBFD' },
  item: {
    width: '94%',
    height: '97%',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: '1.8%',
    marginHorizontal: '3%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  form: { flex: 1, flexDirection: 'column' },
  textBold: { fontWeight: 'bold', fontSize: 18, color: '#636363' },
  address: { fontSize: 16, color: '#636363' },
  content: { fontSize: 16, color: '#636363' },
  status: { fontSize: 16, color: '#636363', fontWeight: 'bold' },
  imagevery: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
    marginVertical: '2%',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 3,
  },
  point: { fontWeight: 'bold', color: '#636363' },
  styleName: { fontSize: 16, fontWeight: 'normal', color: '#636363' },
  imageZoom: { width: '100%', height: '100%' },
  clickImage: { position: 'absolute', top: 30, right: 20, zIndex: 11 },
  goBackimage: { width: 30, height: 30 },
  styleLogo: {
    width: 95,
    height: 95,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginLeft: 12,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    marginLeft: '35%',
  },
  Logo: { height: '100%', resizeMode: 'cover' },
  line: { height: 1, backgroundColor: '#DDDDDD', marginVertical: 5 },
});
