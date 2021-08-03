import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native';
function DetailFunding() {
  return (
    <SafeAreaView style={{ backgroundColor: '#F8F8F8' }}>
      <FlatList
        data={Data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.textBold}>{item.point}</Text>
              </View>
              <Text style={styles.content}>Số tiền đã thu: {item.price}</Text>
              <Text style={styles.content}>Giờ thu: {item.time}</Text>
              <Text style={styles.content}>Mã giao dịch {item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
export default DetailFunding;
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
    borderColor: 'white',
    paddingVertical: 10,
    paddingLeft: 30,
  },
  textBold: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    fontSize: 14,
  },
});
const Data = [
  {
    point: 'VAY THÀNH CÔNG',
    price: '10,000,000',
    time: '8:00AM, ngày 18/09/2019',
    id: '12366',
  },
];
