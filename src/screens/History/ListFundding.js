import { Form, Text } from 'native-base';
import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
function ListCollector() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
     <FlatList         
          data={[{ key: '1', title: i18n.t('FinCCP::CcpHistory.NoFundingHistory') }]}
          renderItem={({ item }) => <Text style={styles.datanull}>{item.title}</Text>}
        />
    </SafeAreaView>
  );
}

export default ListCollector;

const styles = StyleSheet.create({
  item: {
    width: '94%',
    maxHeight: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: '3%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CCCCCC',
    paddingVertical: 10,
    paddingHorizontal:15,
    shadowColor:'#000',
    shadowOffset:{width:1,height:3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  datanull:{
    margin: 10,
    fontWeight:'bold',
    textAlign: 'center'
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  address: {
    fontSize: 16,
    opacity: 0.5,
  },
  textbot: {
    fontWeight: 'normal',
    fontSize: 16,
  },
});
const Data = [
  {
    name: 'Pizza Hut',
    andress: '125 Nguyễn Tri Phương, Quận 1, Tp. Hồ Chí Minh',
    price: '10,000,000',
    time: '8:00AM, ngày 18/09/2019',
    id: '12366',
  },
  {
    name: 'Domino Pizza',
    andress: '60 Cộng hòa, Phường 15, Quận 1, Tp. Hồ Chí Minh',
    price: '10,000,000',
    time: '8:00AM, ngày 18/09/2019',
    id: '123123',
  },
  {
    name: 'KFC Nguyễn Văn Luương',
    andress: '125 Nguyễn Tri Phương, Quận 1, Tp. Hồ Chí Minh',
    price: '10,000,000',
    time: '8:00AM, ngày 18/09/2019',
    id: '141231',
  },
];
