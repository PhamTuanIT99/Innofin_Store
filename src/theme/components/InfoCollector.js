import { Card, Text, View } from 'native-base';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Image, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { getRequestCollection } from '../../api/CollectionAPI';

function InfoCollector() {
  return (
    <Card style={styles.card}>
      <Image style={styles.image} source={require('../../../assets/Pizza.png')} />
      <FlatList
        data={collection}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.id}</Text>
            <Text style={styles.address}>{item.storeAddress}</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:0763882935');
              }}
              style={styles.call}>
              <Text style={styles.phone}>Số điện thoại: {item.id}</Text>
              <Ionicons name="call" color="red" style={styles.storeId} />
            </TouchableOpacity>
            <View style={styles.thanhtoan}>
              <View style={styles.line}></View>
              <Text style={styles.receivable}>Số tiền phải thu: {item.receivable}</Text>
              <Text style={styles.receivable}>Người nộp tiền: {item.username}</Text>
            </View>
          </View>
        )}
      />
    </Card>
  );
}
export { InfoCollector };
const styles = StyleSheet.create({
  card: {
    height: '45%',
    width: '95%',
    flexDirection: 'row',
  },
  call: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  image: {
    resizeMode: 'stretch',
    width: '26%',
    height: 100,
    margin: 15,
  },
  phone: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: '3%',
    marginRight: '4%',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  address: {
    opacity: 0.5,
    fontSize: 14,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
    opacity: 0.7,
    marginBottom: '5%',
  },
  receivable: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon: {
    fontSize: 25,
  },
  thanhtoan: {
    marginTop: '10%',
  },
});
