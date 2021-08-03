import React, { useState } from 'react';
import { Text, Form } from 'native-base';
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert,Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { completeCollection } from '../../api/CollectionAPI';
import i18n from 'i18n-js';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import PropTypes from 'prop-types';
import CameraExpo from '../../components/Camera/Camera';
import * as ImageManipulator from 'expo-image-manipulator';

function ProofScreen({ startLoading, stopLoading }) {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { data, location } = route.params;
  let formdata = new FormData();
  formdata.append('id', data.id);
  formdata.append('images', image);
  location !== null && location !== undefined
    ? formdata.append('Lat', location.coords.latitude)
    : formdata.append('Lat', '0');
  location !== null && location !== undefined
    ? formdata.append('Lng ', location.coords.longitude)
    : formdata.append('Lng', '0');

  const getImageType = fileType => {
    switch (fileType) {
      case '.gif':
        return 'image/gif';
      case '.jpg':
        return 'image/jpeg';
      case '.jpeg':
        return 'image/jpeg';
      case '.jfif':
        return 'image/jpeg';
      case '.pjpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.svg':
        return 'image/svg+xml';
      default:
        return 'image/jpeg';
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Form style={styles.border}>
          <CameraExpo
            title={i18n.t('FinCCP::CcpHistory.Proof')}
            setImg={result => {
              let reSize = async () => {
                const setImg = await ImageManipulator.manipulateAsync(result.uri, [], {
                  compress: Platform.OS === 'ios' ? 0 : 0.5,
                });
                let i = {
                  uri: setImg.uri,
                  type: getImageType(
                    result.uri.substring(result.uri.lastIndexOf('.') + 1, result.uri.length),
                  ),
                  name: result.uri.substring(result.uri.lastIndexOf('/') + 1, result.uri.length),
                };
                setImage(i);
              };
              reSize();
            }}
            setImage={image}
            Uri={image !== null ? { uri: image.uri } : null}
          />
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.btnfinish}
              onPress={() => {
                if (image == undefined) {
                  Alert.alert(i18n.t('FinCCP::CcpCollection.InputImage'));
                } else {
                  {
                    startLoading({ key: 'proof' });
                    completeCollection(formdata)
                      .finally(() => stopLoading({ key: 'proof' }))
                      .then(result => {
                        if (result.error) {
                        } else {
                          navigation.navigate('CompleteCollection', { data });
                        }
                      });
                  }
                }
              }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                {i18n.t('FinCCP::CcpCollection.Completed')}
              </Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
}

ProofScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: ProofScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
const styles = StyleSheet.create({
  title: { fontSize: 16, color: 'red', fontWeight: 'bold', marginVertical: '3%' },
  borderimage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    zIndex: 2,
    position: 'absolute',
    borderRadius: 3,
  },
  btnfinish: {
    paddingVertical: 15,
    backgroundColor: '#2CD1F8',
    borderRadius: 10,
    width: '100%',
  },
  form: {
    marginTop: 10,
    marginHorizontal: '5%',
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    marginBottom: '10%',
  },
});
