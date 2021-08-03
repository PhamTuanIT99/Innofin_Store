import React, { useRef, useState } from 'react';
import { Text, Item, Input, Form } from 'native-base';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import * as yup from 'yup';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { requestDeposit } from '../../api/HistoryAPI';
import { connectToRedux } from '../../utils/ReduxConnect';
import LoadingActions from '../../store/actions/LoadingActions';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import CameraExpo from '../../components/Camera/Camera';
import * as ImageManipulator from 'expo-image-manipulator';

const ValidationSchema = yup.object().shape({
  code: yup.string().required('Nhập code'),
  point: yup.number().required('Nhập point'),
});

function RequestDeposit({ startLoading, stopLoading }) {
  const CodeRef = useRef();
  const pointRef = useRef();
  const [point, setPoint] = useState('');
  const [code, setCode] = useState();
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
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
  let formdata = new FormData();
  formdata.append('code', code);
  formdata.append('point', point == null ? point : point.replace(/[^0-9]/g, ''));
  formdata.append('images', image);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 0}
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'position' : null}>
      <ScrollView style={styles.styleScroll}>
        {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
        <View style={styles.text}>
          <Text style={styles.textstyle}>{i18n.t('FinCCP::CcpDeposit.TutorialDeposit')}</Text>
        </View>
        <View style={styles.form}>
          <Formik validationSchema={ValidationSchema} initialValues={{ code: '', point: '' }}>
            {({ handleBlur, handleSubmit, handleChange, errors }) => (
              <>
                <Form style={styles.request}>
                  <Text style={styles.title}>
                    {i18n.t('FinCCP::CcpDeposit.Deposittransactioncode')}
                  </Text>
                  <Item style={styles.item}>
                    <Input
                      ref={CodeRef}
                      style={styles.stylecodeinput}
                      // onChangeText={() => (handleChange('code'), () => code => setPoint(code))}
                      // onBlur={handleBlur('code')}
                      onChangeText={code => setCode(code)}
                      value={code}
                      onSubmitEditing={() => pointRef.current._root.focus()}
                      returnKeyType="next"
                      autoCapitalize="none"
                    />
                  </Item>
                  <ValidationMessage>{errors.code}</ValidationMessage>
                  <Text style={styles.title}>
                    {i18n.t('FinCCP::CcpDeposit.NumberPointWantTopUp')}
                  </Text>
                  <Item style={styles.item}>
                    <Input
                      ref={pointRef}
                      style={{
                        color: '#2CD1F8',
                        fontSize: 16,
                        fontWeight: 'bold',
                        height: 45,
                      }}
                      // onChangeText={() => (handleChange('point'), () => point => setPoint(point))}
                      // onBlur={handleBlur('point')}
                      onChangeText={point =>
                        setPoint(Number(point.replace(/[^0-9]/g, '')).toLocaleString('en-US'))
                      }
                      keyboardType="number-pad"
                      value={point}
                      returnKeyType="done"
                      autoCapitalize="none"
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {i18n.t('FinCCP::CcpAccount.Point')}
                    </Text>
                  </Item>
                  <ValidationMessage>{errors.point}</ValidationMessage>
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
                            result.uri.substring(
                              result.uri.lastIndexOf('.') + 1,
                              result.uri.length,
                            ),
                          ),
                          name: result.uri.substring(
                            result.uri.lastIndexOf('/') + 1,
                            result.uri.length,
                          ),
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
                      style={styles.submit}
                      onPress={() => {
                        if (point == 0 || code == null) {
                          Alert.alert(i18n.t('FinCCP::CcpDeposit.Null'));
                        } else {
                          if (image == null) {
                            Alert.alert(
                              i18n.t('FinCCP::CcpAccount.PleaseTakeAPhotoForVerification'),
                            );
                          } else {
                            handleSubmit;
                            startLoading({ key: 'request' });
                            requestDeposit(formdata)
                              .then(data => {
                                if (data.error) {
                                } else {
                                  navigation.navigate('SuccessDeposit');
                                }
                              })
                              .finally(() => stopLoading({ key: 'request' }));
                          }
                        }
                      }}>
                      <Text style={styles.textSubmit}>{i18n.t('FinCCP::CcpHistory.Deposit')}</Text>
                    </TouchableOpacity>
                  </View>
                </Form>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
RequestDeposit.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};
export default connectToRedux({
  component: RequestDeposit,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
const styles = StyleSheet.create({
  styleScroll: { backgroundColor: '#FBFBFD', height: '100%' },
  text: {
    fontSize: 17,
    marginLeft: 30,
    color: '#636363',
    width: '90%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  item: { borderWidth: 1, width: '90%', marginLeft: '5%', marginTop: 0, marginBottom: 10 },
  button: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: '10%',
  },
  textstyle: {
    fontStyle: 'italic',
    opacity: 0.6,
  },
  textSubmit: { fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' },
  submit: {
    paddingVertical: 16,
    paddingHorizontal: 27,
    borderRadius: 20,
    backgroundColor: '#2CD1F8',
    width: '90%',
    borderRadius: 8,
    textTransform: 'none',
  },
  request: {
    marginTop: '5%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: '5%',
  },
  title: { marginLeft: '5%', marginTop: '5%', opacity: 0.5 },
  stylecodeinput: { color: '#636363', fontSize: 16, fontWeight: 'bold', height: 45 },
});
