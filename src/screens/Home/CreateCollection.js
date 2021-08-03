import { Input, Item, Label, Icon, Picker, Button } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Textarea from 'react-native-textarea';
import i18n from 'i18n-js';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const TextRed = styled.Text`
  color: #ff0000;
`;
function CreateCollection() {
  const [total, setTotal] = useState();
  const [content, setContent] = useState();
  const [payer, setPayer] = useState();
  const [phone, setPhone] = useState();
  const [DateDisplay, setDateDisplay] = useState(new Date());
  const [visibility, setvisibility] = useState(false);
  const navigation = useNavigation();

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
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Label style={{ marginLeft: '5%' }}>
        Tổng tiền<TextRed> *</TextRed>
      </Label>
      <Item style={styles.itemstyle}>
        <Input
          onChangeText={total =>
            setTotal(Number(total.replace(/[^0-9]/g, '')).toLocaleString('en-US'))
          }
          keyboardType="number-pad"
          value={total}
          returnKeyType="done"
          autoCapitalize="none"
        />
      </Item>
      <Label style={{ marginLeft: '5%' }}>
        Thời gian yêu cầu<TextRed> *</TextRed>
      </Label>
      <Item style={styles.itemstyle}>
        <TouchableOpacity style={styles.datetime} onPress={onPressShow}>
          <Icon name="time-outline" style={{ fontSize: 18, marginTop: 2 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {DateDisplay ? moment(DateDisplay).format('h:mm a') : DateDisplay}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          onDateChange={setDateDisplay}
          isVisible={visibility}
          onConfirm={handleConfirm}
          onCancel={onPressCancel}
          maximumDate={new Date()}
          mode="time"
        />
      </Item>
      <Label style={{ marginLeft: '5%' }}>
        Người giao tiền<TextRed> *</TextRed>
      </Label>
      <Item style={styles.itemstyle}>
        <Input
          onChangeText={payer => setPayer(payer)}
          value={payer}
          returnKeyType="done"
          autoCapitalize="none"
        />
      </Item>
      <Label style={{ marginLeft: '5%' }}>
        Số điện thoại<TextRed> *</TextRed>
      </Label>
      <Item style={styles.itemstyle}>
        <Input
          onChangeText={phone => setPhone(phone)}
          keyboardType="phone-pad"
          value={phone}
          returnKeyType="done"
          autoCapitalize="none"
        />
      </Item>
      <Label style={{ marginLeft: '5%' }}>Mô tả</Label>
      <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        onChangeText={content => setContent(content)}
        value={content}
        maxLength={240}
        placeholder={i18n.t('FinCCP::CcpReport.WhatHappened')}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
      />
      <Button
        onPress={() => navigation.navigate('Funds')}
        abpButton
        style={{
          width: '90%',
          marginLeft: '5%',
          backgroundColor: '#2CD1F8',
          marginVertical: '5%',
          borderRadius: 8,
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {'Tiếp tục'.toUpperCase()}
        </Text>
      </Button>
    </ScrollView>
  );
}

export default CreateCollection;
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
    height: 150,
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
