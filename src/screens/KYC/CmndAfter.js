import { Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import i18n from 'i18n-js';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

function CmndAfter() {
  const route = useRoute();
  const [modalShow, setModalshow] = useState(false);
  const navigaton = useNavigation();
  const { A } = route.params;
  return (
    <ImageBackground
      source={require('../../../assets/Rectangle-76.png')}
      style={{ flex: 1, alignItems: 'center' }}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
      <View style={styles.form}>
        <View>
          <TouchableOpacity style={styles.image} onPress={() => setModalshow(true)}>
            {A && <Image style={styles.ctnImage} source={A} />}
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={modalShow}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <TouchableOpacity
                style={{ position: 'absolute', top: 30, right: 20, zIndex: 11 }}
                onPress={() => setModalshow(!modalShow)}>
                <Image
                  source={require('../../../assets/deleteimage.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: '100%', height: '100%' }}>
                <ReactNativeZoomableView
                  maxZoom={1.5}
                  minZoom={0.5}
                  zoomStep={0.5}
                  initialZoom={1}
                  bindToBorders={true}
                  captureEvent={true}>
                  {{ A } && (
                    <Image
                      style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                      source={{ uri: A.uri }}
                    />
                  )}
                </ReactNativeZoomableView>
              </View>
            </View>
          </Modal>
        </View>
        <Text style={styles.title}>{i18n.t('FinCCP::CcpKYC.Warning')}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button
            abpButton
            style={[styles.button, { backgroundColor: '#CBCBCB' }]}
            onPress={() => navigaton.push('TakeAfter')}>
            <Text style={styles.textButton}>{i18n.t('FinCCP::CcpKYC.Capture')}</Text>
          </Button>
          <Button
            abpButton
            style={styles.button}
            onPress={() => navigaton.navigate('CardKyc', { A })}>
            <Text style={styles.textButton}>{i18n.t('FinCCP::CcpKYC.UsePhotos')}</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

export default CmndAfter;
const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    width: 325,
    height: 202,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    marginTop: '15%',
  },
  form: { alignItems: 'center', width: '90%' },
  ctnImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  title: { fontSize: 15, textAlign: 'center', marginTop: 30, marginBottom: 70 },
  button: {
    alignItems: 'center',
    width: '49%',
    borderRadius: 8,
    backgroundColor: '#2CD1F8',
    marginHorizontal: '1%',
  },
  textButton: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});
