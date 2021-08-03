import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { Icon } from 'native-base';
import i18n from 'i18n-js';


function HelpProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.help}>
        <SafeAreaView style={styles.margin}>
          <View style={styles.styleCHTG}>
            <Icon name="help-circle-outline" style={{ color: '#C52AFE' }} />
            <Text style={styles.header}>{i18n.t('FinCCP::CcpHelp.FrequentlyAskedQuestions')}</Text>
          </View>
          <FlatList
            data={Data}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={styles.id}> {i18n.t('FinCCP::CcpHelp.TheSentence')} {item.id}:</Text>
                  <Text style={styles.ask}> {item.ask}</Text>
                  <Text style={styles.answer}> {item.answer}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </SafeAreaView>
      <View style={styles.viewbottom}>
        <TouchableOpacity
          style={styles.phoneCall}
          onPress={() => {
            Linking.openURL('tel:0981163379');
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../../assets/phonehelp.png')} style={styles.icon} />
            <Text style={styles.textbottom}>Hotline: 0981163379</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textbottom1}>{i18n.t('FinCCP::CcpHelp.Tutorial')}</Text>
      </View>
    </SafeAreaView>
  );
}

export default HelpProfile;

const styles = StyleSheet.create({
  container:{backgroundColor: '#FBFBFD', flex: 1 },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  help: {
    borderWidth: 1,
    backgroundColor:'white',
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  margin: {
    marginVertical: 10,
    marginLeft: 30,
    height: 450,
  },
  header: {
    color: '#C52AFE',
    fontWeight: 'bold',
    fontSize: 20,
  },
  id: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  ask: {
    fontWeight: '600',
    marginBottom: 7,
  },
  answer: {
    fontStyle: 'italic',
    fontWeight: '400',
  },
  viewbottom: {
    alignItems: 'center',
    marginTop: 20,
  },
  textbottom: {
    color: '#ED822E',
    fontWeight: 'bold',
  },
  textbottom1: {
    color: '#AEAEAE',
    fontStyle: 'italic',
    paddingBottom: 100,
    marginTop: 10,
  },
  styleCHTG:{ flexDirection: 'row', alignItems: 'center',width:'92%'}
});
const Data = [
  {
    id: '1',
    ask: 'Làm thế nào để đổi mật khẩu',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '2',
    ask: 'Không hiện địa chỉ thu hộ',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n  -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '3',
    ask: 'Các nạp điểm',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n  -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '4',
    ask: 'Làm thế nào để đổi mật khẩu',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n  -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '5',
    ask: 'Làm thế nào để đổi mật khẩu',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '6',
    ask: 'Làm thế nào để đổi mật khẩu',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '7',
    ask: 'Làm thế nào để đổi mật khẩu',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n -> Chọn mục "Đổi mật khẩu".',
  },
  {
    id: '8  ',
    ask: 'Làm thế nào để đổi mật khẩu',
    answer: 'Chọn mục "Tài khoản" -> Chọn mục "Cài đặt"\n -> Chọn mục "Đổi mật khẩu".',
  },
];
