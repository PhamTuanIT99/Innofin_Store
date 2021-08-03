import { Body, Button, Left, ListItem, Text } from 'native-base';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { UpdateImageIndentity } from '../../api/IdentityAPI';
import { connectToRedux } from '../../utils/ReduxConnect';
import LoadingActions from '../../store/actions/LoadingActions';
import PropTypes from 'prop-types';

function CardKyc({ startLoading, stopLoading }) {
  const route = useRoute();
  const { item, B, A, F } = route.params;
  const navigation = useNavigation();

  let formdata = new FormData();
  formdata.append('IdentityType', item.id);
  formdata.append('IdentityBefore', B);
  formdata.append('IdentityAfter', A);
  formdata.append('ImageVerify', F);
  function Button1() {
    return (
      <Button abpButton disabled={true} style={styles.styleBt1}>
        <Text style={styles.textHD}>{i18n.t('FinCCP::CcpKYC.Confirm')}</Text>
      </Button>
    );
  }
  function Button2() {
    return (
      <Button
        abpButton
        style={[styles.styleBt1, { backgroundColor: '#2CD1F8' }]}
        onPress={() => {
          startLoading({ key: 'updateImage' });
          UpdateImageIndentity(formdata)
            .then(data => {
              if (data.error) {
                console.log(data.error);
              } else {
                Alert.alert(i18n.t('FinCCP::SucessfullyUpdated'));
                navigation.navigate('Profile');
              }
            })
            .finally(() => stopLoading({ key: 'updateImage' }));
        }}>
        <Text style={styles.textHD}>{i18n.t('FinCCP::CcpKYC.Confirm')}</Text>
      </Button>
    );
  }
  return (
    <ImageBackground
      source={require('../../../assets/Rectangle-76.png')}
      style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
      <ScrollView>
        <View style={{ width: '90%', marginLeft: '5%' }}>
          <Text>{item.description}</Text>
          <View style={styles.ctnCmnd}>
            <View style={styles.cmndMTS}>
              <View style={styles.cmnd}>
                <TouchableOpacity onPress={() => navigation.navigate('TakeBefore')}>
                  {B !== undefined ? (
                    <Image style={{ width: 159, height: 110 }} source={B} />
                  ) : (
                    <Image source={require('../../../assets/cmndMT.png')} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.textMTS}>{i18n.t('FinCCP::CcpUpdateProfile.Front')}</Text>
            </View>
            <View style={styles.cmndMTS}>
              <View style={styles.cmnd}>
                <TouchableOpacity onPress={() => navigation.navigate('TakeAfter')}>
                  {A == undefined ? (
                    <Image source={require('../../../assets/cmndMS.png')} />
                  ) : (
                    <Image style={{ width: 159, height: 110 }} source={A}></Image>
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.textMTS}>{i18n.t('FinCCP::CcpUpdateProfile.Backside')}</Text>
            </View>
          </View>
          <View style={[styles.cmndMTS, { marginVertical: 20 }]}>
            <View style={styles.cmnd}>
              <TouchableOpacity onPress={() => navigation.navigate('FaceRec')}>
                {F == null ? (
                  <Image source={require('../../../assets/iconAvata.png')} />
                ) : (
                  <Image style={{ width: 110, height: 110, borderRadius: 120 }} source={F}></Image>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.textMTS}>{i18n.t('FinCCP::CcpKYC.FaceRecognition')}</Text>
          </View>
          <View style={styles.tutorial}>
            <Text style={styles.title}>{i18n.t('FinCCP::CcpKYC.Title')}</Text>
            <View style={{ width: '100%', paddingBottom: 20 }}>
              <ListItem noIndent icon style={styles.list}>
                <Left>
                  <Image source={require('../../../assets/iconKyc.png')} />
                </Left>
                <Body style={styles.bodyStyle}>
                  <Text style={styles.textHD}>{i18n.t('FinCCP::CcpKYC.Tutorial1')}</Text>
                </Body>
              </ListItem>
              <ListItem noIndent icon style={styles.list}>
                <Left>
                  <Image source={require('../../../assets/iconKyc.png')} />
                </Left>
                <Body style={styles.bodyStyle}>
                  <Text style={styles.textHD}>{i18n.t('FinCCP::CcpKYC.Tutorial2')}</Text>
                </Body>
              </ListItem>
              <ListItem noIndent icon style={styles.list}>
                <Left>
                  <Image source={require('../../../assets/iconKyc.png')} />
                </Left>
                <Body style={styles.bodyStyle}>
                  <Text style={styles.textHD}>{i18n.t('FinCCP::CcpKYC.Tutorial3')}</Text>
                </Body>
              </ListItem>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {(B == null || A == null || F == null ? <Button1 /> : <Button2 />)}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

CardKyc.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};
export default connectToRedux({
  component: CardKyc,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
const styles = StyleSheet.create({
  cmnd: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 119,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  tutorial: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: '100%',
    borderRadius: 8,
    alignItems: 'center',
    width: '99%',
    marginHorizontal: '0.5%',
    marginBottom: 40,
  },
  list: {
    height: 35,
    borderColor: 'grey',
  },
  bodyStyle: {
    borderBottomWidth: null,
  },
  ctnCmnd: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cmndMTS: { flexDirection: 'column', alignItems: 'center' },
  textMTS: { fontWeight: 16, fontWeight: 'bold', marginTop: 5 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: Platform.OS === 'ios' ? null : 15,
  },
  textHD: { fontSize: 16 },
  styleBt1: { width: '50%', borderRadius: 8, marginBottom: 20 },
  borderimage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#BEBEBE',
  },
});
