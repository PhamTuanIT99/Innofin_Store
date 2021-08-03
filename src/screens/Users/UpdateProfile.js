import React, { useRef, useState } from 'react';
import { Text, Input, View, Picker, Form, Item } from 'native-base';
import { StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { GetDistricts, GetWards } from '../../api/LocationAPI';

const platform = Platform.OS;

export default function UpdateProfile({ editingUser = {}, submit }) {
  const onSubmit = values => {
    submit({
      ...editingUser,
      ...values,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FBFBFD',
        alignItem: 'center',
      }}>
      <ScrollView>
        <Formik
          enableReinitialize
          initialValues={{
            ...editingUser,
          }}
          onSubmit={values => onSubmit(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <MyForm
              values={values}
              setFieldValue={setFieldValue}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}
export const MyForm = props => {
  const { handleSubmit, values, setFieldValue, handleChange, handleBlur } = props;
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [identityDate, setIdentityDate] = useState('');
  const [visibility, setvisibility] = useState(false);
  const [visibility1, setvisibility1] = useState(false);
  const [cityId, setCity] = useState();
  const [districId, setDistrictsID] = useState();
  const [wardId, setWardId] = useState();
  const [Districts, setDistricts] = useState();
  const [Ward, setWards] = useState();

  const route = useRoute();
  const { Cities } = route.params;

  const handleConfirm = date => {
    setvisibility(false);
    setDateOfBirth(date);
    setFieldValue('dateOfBirth', date);
  };
  const onPressCancel = () => {
    setvisibility(false);
  };
  const onPressShow = () => {
    setvisibility(true);
  };
  const handleConfirm1 = date => {
    setvisibility1(false);
    setIdentityDate(date);
    setFieldValue('identityDate', date);
  };
  const onPressCancel1 = () => {
    setvisibility1(false);
  };
  const onPressShow1 = () => {
    setvisibility1(true);
  };
  const loadDistrict = id => {
    GetDistricts(id).then(data => {
      setDistricts(data || {});
    });
  };
  const loadWard = idDistrict => {
    GetWards(idDistrict).then(data => {
      setWards(data || {});
    });
  };
  const dateOfBirthRef = useRef();
  const phoneNumberRef = useRef();
  const nameRef = useRef();
  const surNameRef = useRef();
  const identityNumberRef = useRef();
  const identityDateRef = useRef();
  const identityAddressRef = useRef();

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Form style={styles.login}>
          <Text style={[styles.titleID, { marginTop: '3%' }]}>
            {i18n.t('FinCCP::CcpProfile.dateOfBirth')}:
          </Text>
          <Item style={[styles.inputID, { marginLeft: '5%' }]} onPress={onPressShow}>
            <TouchableOpacity onPress={onPressShow} style={{ marginVertical: 15 }}>
              {dateOfBirth == '' ? (
                <Text onPress={onPressShow}>{moment(values.dateOfBirth).format('DD/MM/yy')}</Text>
              ) : (
                <Text>{dateOfBirth ? moment(dateOfBirth).format('DD/MM/YYYY') : dateOfBirth}</Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
              ref={dateOfBirthRef}
              isVisible={visibility}
              onConfirm={handleConfirm}
              onCancel={onPressCancel}
              mode="date"
              date={moment(values.dateOfBirth).toDate()}
            />
          </Item>
          <Text style={styles.titleID}>{i18n.t('FinCCP::SurName')}: </Text>
          <Item style={styles.inputID}>
            <Input
              ref={surNameRef}
              onSubmitEditing={() => nameRef.current._root.focus()}
              returnKeyType="next"
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
            />
          </Item>
          <Text style={styles.titleID}>{i18n.t('FinCCP::CcpProfile.Name')}: </Text>
          <Item style={styles.inputID}>
            <Input
              ref={nameRef}
              returnKeyType="next"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
          </Item>
          <Text style={styles.titleID}>{i18n.t('FinCCP::CcpAccount:PhoneNumber')}: </Text>
          <Item style={styles.inputID}>
            <Input
              ref={phoneNumberRef}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              keyboardType="number-pad"
            />
          </Item>
          <Text style={styles.titleID}>{i18n.t('FinCCP::Citie')}:</Text>
          <Item style={[styles.inputID, styles.pickerView]}>
            <Picker
              placeholder={values.cityName}
              style={styles.picker}
              mode="dialog"
              iosHeader={i18n.t('FinCCP::Citie')}
              onValueChange={value => {
                setFieldValue('cityId', value);
                loadDistrict(value);
                setCity(value);
              }}
              selectedValue={cityId}>
              {platform === 'ios ' ? (
                ''
              ) : (
                <Picker.Item color="grey" label={values.cityName} value="" />
              )}
              {Cities.items.map(item => (
                <Picker.Item label={item.displayName} value={item.id} key={item.id} />
              ))}
            </Picker>
          </Item>
          <View style={styles.line}></View>
          <Text style={styles.titleID}>{i18n.t('FinCCP::District')}:</Text>
          <Item style={[styles.inputID, styles.pickerView]}>
            {Districts == null ? (
              <Picker placeholder={values.districtName} enabled={false}>
                <Picker.Item color="grey" label={values.districtName} value="" />
              </Picker>
            ) : (
              <Picker
                style={styles.picker}
                mode="dialog"
                iosHeader={i18n.t('FinCCP::District')}
                onValueChange={value => {
                  setFieldValue('districtId', value);
                  loadWard(value);
                  setDistrictsID(value);
                }}
                selectedValue={districId}>
                {Districts.items.map(item => (
                  <Picker.Item label={item.name} value={item.id} key={item.id} />
                ))}
              </Picker>
            )}
          </Item>
          <View style={styles.line}></View>
          <Text style={styles.titleID}>{i18n.t('FinCCP::Ward')}:</Text>
          <Item style={[styles.inputID, styles.pickerView]}>
            {Ward == null ? (
              <Picker placeholder={values.wardName} enabled={false}>
                <Picker.Item color="grey" label={values.wardName} value="" />
              </Picker>
            ) : (
              <Picker
                style={styles.picker}
                mode="dialog"
                iosHeader={i18n.t('FinCCP::Ward')}
                onValueChange={value => {
                  setFieldValue('wardId', value);
                  setWardId(value);
                }}
                selectedValue={wardId}>
                {Ward.items.map(item => (
                  <Picker.Item label={item.name} value={item.id} key={item.id} />
                ))}
              </Picker>
            )}
          </Item>
          <View style={styles.line}></View>
        </Form>
        {values.verify !== 1 ? (
          <Form style={[styles.login, { marginTop: 25 }]}>
            <Text style={[styles.titleID, { marginTop: '3%' }]}>
              {i18n.t('FinCCP::IdentityNumber')}:{' '}
            </Text>
            <Item style={styles.inputID}>
              <Input
                ref={identityNumberRef}
                onChangeText={handleChange('identityNumber')}
                onBlur={handleBlur('identityNumber')}
                value={values.identityNumber}
                keyboardType="number-pad"
              />
            </Item>
            <Text style={styles.titleID}>{i18n.t('FinCCP::IdentityDate')}:</Text>
            <Item style={[styles.inputID, { marginLeft: '5%' }]} onPress={onPressShow1}>
              <TouchableOpacity onPress={onPressShow1} style={{ marginVertical: 15 }}>
                {identityDate == '' ? (
                  <Text onPress={onPressShow1}>
                    {moment(values.identityDate).format('DD/MM/yyyy')}
                  </Text>
                ) : (
                  <Text>
                    {identityDate ? moment(identityDate).format('DD/MM/YYYY') : identityDate}
                  </Text>
                )}
              </TouchableOpacity>
              <DateTimePicker
                ref={identityDateRef}
                isVisible={visibility1}
                onConfirm={handleConfirm1}
                onCancel={onPressCancel1}
                mode="date"
                maximumDate={new Date()}
              />
            </Item>
            <Text style={styles.titleID}>{i18n.t('FinCCP::IdentityAddress')}:</Text>
            <Item style={styles.inputID}>
              <Input
                ref={identityAddressRef}
                onChangeText={handleChange('identityAddress')}
                onBlur={handleBlur('identityAddress')}
                value={values.identityAddress}
              />
            </Item>
          </Form>
        ) : null}
      </View>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.textSubmit}>{i18n.t('FinCCP::CcpProfile.Update')}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  pickerView: {
    marginLeft: platform === 'ios' ? 3 : '3%',
    borderBottomWidth: null,
    marginBottom: 0,
  },
  login: {
    marginTop: '1%',
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
  },
  line: {
    height: 1,
    backgroundColor: '#DDDDDD',
    width: '90%',
    marginLeft: '4%',
    marginBottom: 10,
  },
  inputID: { width: '90%', marginBottom: 10 },
  titleID: { marginLeft: '5%', opacity: 0.5 },
  picker: { width: '900%' },
  submit: {
    paddingVertical: 16,
    backgroundColor: '#2CD1F8',
    marginHorizontal: 20,
    width: '90%',
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 25,
  },
  textSubmit: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
