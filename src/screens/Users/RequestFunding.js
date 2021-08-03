import React from 'react';
import { Text, Item, Input, Form, Button } from 'native-base';
import { StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RequestFunding() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.text}>
        <Text style={styles.textstyle}>Bước 1:</Text>
        <Text style={styles.textstyle}>
          Nạp thêm tiền vào tài khoản tại bất kì chi nhánh nào của {'\n'}ngân hàng BIDV.
        </Text>
        <Text style={styles.textstyle}>Ghi mã số nhân viên trong phần nội dung nạp tiền</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.textstyle}>Bước 2:</Text>
        <Text style={styles.textstyle}>Điền thông tin và nhấn nút "vay" ở bên dưới.</Text>
      </View>
      <View style={styles.form}>
        <Form style={styles.border}>
          <Text>Mã giao dịch vay điểm</Text>
          <Item regular style={styles.item}>
            <Input placeholder="" />
          </Item>
          <Text style={styles.textinput}>Số điểm muốn vay</Text>
          <Item regular style={styles.item}>
            <Input placeholder="" />
          </Item>
        </Form>
        <View style={styles.button}>
          <Button
            style={styles.colorbtn}
            onPress={() =>
              Alert.alert(
                'Đã gửi yêu cầu',
                'Yêu cầu nạp thêm điểm \n của bạn đã được ghi nhận. \nĐiểm của bạn sẽ được nạp vào tài khoản trong vòng 15 phút.',
                [{ text: 'Về trang chủ', onPress: () => navigation.navigate('Home') }],
              )
            }>
            <Text> Vay </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RequestFunding;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginLeft: 30,
    marginTop: 30,
  },
  form: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
  },
  item: {
    marginTop: 10,
    borderColor: '#21409a',
  },
  button: {
    marginTop: 40,
    alignItems: 'center',
  },
  colorbtn: {
    backgroundColor: '#21409a',
  },
  textstyle: {
    fontStyle: 'italic',
    opacity: 0.6,
  },
  textinput: {
    marginTop: 10,
  },
});
