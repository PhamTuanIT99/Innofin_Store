import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const NoConnectionScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/no_connections.png')}
        style={{ width: '100%', height: '100%', maxWidth: '100%' }}
        resizeMode="contain"
      />
      <Text style={styles.text}>Không có kết nối mạng vui lòng thử lại</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 46,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default NoConnectionScreen;
