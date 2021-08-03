import { Formik } from 'formik';
import { Icon, Item, Label, Picker, Button } from 'native-base';
import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import i18n from 'i18n-js';
import Textarea from 'react-native-textarea';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const createQuestion = () => ({
  index: '',
  text: '',
  namemoney: '',
  content: '',
});
function funds() {
  const navigation = useNavigation();
  return (
    <Formik initialValues={{ questions: [] }} onSubmit={values => console.log(values)}>
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ backgroundColor: 'white' }}>
            <Label style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
              Nguồn tiền
            </Label>
            {values.questions.map(({ text, namemoney, content }, index) => (
              <View key={index}>
                <TextInput
                  key={index}
                  onChangeText={handleChange(`questions[${index}].text`)}
                  onBlur={handleBlur(`questions[${index}].text`)}
                  value={values.questions[index].text}
                />
                <Item style={styles.itemstyle}>
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={values.questions[index].namemoney}
                    onValueChange={handleChange(`questions[${index}].namemoney`)}>
                    <Picker.Item label="Doanh thu" value="0" />
                    <Picker.Item label="Lấy hàng" value="1" />
                    <Picker.Item label="Nhân viên ứng" value="2" />
                  </Picker>
                </Item>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={handleChange(`questions[${index}].content`)}
                  value={values.questions[index].content}
                  maxLength={240}
                  placeholder={i18n.t('FinCCP::CcpReport.WhatHappened')}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
                <TouchableOpacity
                  onPress={() => {
                    values.questions.splice(-1, 1),
                      setFieldValue('questions', [...values.questions]);
                  }}>
                  <Icon name="remove-circle" style={{ color: 'red', fontSize: 18 }} />
                </TouchableOpacity>
              </View>
            ))}
            <Button
              onPress={() => setFieldValue('questions', [...values.questions, createQuestion()])}
              abpButton
              style={{
                maxWidth: '40%',
                marginLeft: '5%',
                backgroundColor: '#2CD1F8',
                marginVertical: '5%',
                borderRadius: 8,
              }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Thêm nguồn tiền
              </Text>
            </Button>
            <Button
              onPress={() => {
                if ([...values.questions] == null) {
                  Alert.alert('hello rong');
                } else {
                  handleSubmit();
                  navigation.navigate('Statement');
                }
              }}
              style={{
                width: '90%',
                marginLeft: '5%',
                backgroundColor: '#2CD1F8',
                marginVertical: '5%',
                borderRadius: 8,
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {'Tiếp tục'.toUpperCase()}
              </Text>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
}

export default funds;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  itemstyle: {
    borderWidth: 1,
    width: '90%',
    marginLeft: '5%',
    marginTop: 0,
    marginBottom: 10,
    height: 30,
  },
  datetime: {
    borderColor: '#BEBEBE',
    paddingHorizontal: 13,
    borderRadius: 5,
    flexDirection: 'row',
  },
  textarea: {
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
    fontSize: 16,
  },
  textareaContainer: {
    marginLeft: '5%',
    backgroundColor: 'white',
    width: windowWidth - 40,
    height: 70,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'grey',
    marginTop: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
  },
});
