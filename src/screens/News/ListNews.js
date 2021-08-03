import { Body, View } from 'native-base';
import React from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

function ListNews() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetailNews')}>
            <Image style={styles.image} source={item.src} />
            <Body>
              <View>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <Text numberOfLines={2}>{item.content}</Text>
              </View>
            </Body>
            <View style={styles.detail}>
              <Text style={{ color: '#0080FF', fontSize: 14 }}>
                {i18n.t('FinCCP::CcpNews.Detail')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default ListNews;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: '97%',
    maxHeight: '100%',
    flexDirection: 'row',
    marginHorizontal: '1.5%',
    marginVertical: '1.5%',
    padding: 2,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderColor: '#D8D8D8',
    borderWidth: 1,
  },
  image: {
    resizeMode: 'stretch',
    width: 80,
    height: 80,
    marginRight: '1%',
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: '1%' },
  detail: { justifyContent: 'center', alignItems: 'center', marginLeft: '7%', marginRight: '4%' },
});
const data = [
  {
    key: '1',
    title: 'Tình hình Covid-19 hiện nay',
    src: require('../../../assets/tin-tuc-1.png'),
    content: 'Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện',
  },

  {
    key: '2',
    title: 'Tin tức 2',
    src: require('../../../assets/tin-tuc-2.jpg'),
    content: 'Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện',
  },

  {
    key: '3',
    title: 'Tình hình Covid-19 hiện nay',
    src: require('../../../assets/tin-tuc-1.png'),
    content: 'Thu hộ là một công việc đơn giản mà ai củng có thể tham gia và thực hiện',
  },
];
