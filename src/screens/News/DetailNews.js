import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView, StyleSheet, FlatList, Image, View } from 'react-native';

function DetailNews() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Image style={styles.image} source={item.src} />
            <View style={styles.containerText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
export default DetailNews;
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', resizeMode: 'stretch' },
  title: { fontWeight: 'bold', fontSize: 18, paddingVertical: '1%' },
  containerText: { padding: '2%' },
});
const data = [
  {
    key:'1',
    title: 'Tình hình Covid-19 hiện nay',
    src: require('../../../assets/tin-tuc-1.png'),
    src: require('../../../assets/tin-tuc-1.png'),
    src: require('../../../assets/tin-tuc-1.png'),
    content:
      'Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện',
  },

];
