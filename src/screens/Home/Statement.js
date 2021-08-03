import i18n from 'i18n-js';
import { Button, Form, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import InputStatement from '../../components/Input/InputStatement';

function Statement() {
  const navigation = useNavigation();
  const [sl_1, setSl_1] = useState(0);
  const [sl_11, setSl_11] = useState(0);
  const [sl_2, setSl_2] = useState(0);
  const [sl_3, setSl_3] = useState(0);
  const [sl_4, setSl_4] = useState(0);
  const [sl_5, setSl_5] = useState(0);
  const [sl_6, setSl_6] = useState(0);
  const [sl_7, setSl_7] = useState(0);
  const [sl_8, setSl_8] = useState(0);
  const [sl_9, setSl_9] = useState(0);
  const [sl_10, setSl_10] = useState(0);
  const ttsl_1 = sl_1 * 500000;
  const ttsl_11 = sl_11 * 200000;
  const ttsl_2 = sl_2 * 100000;
  const ttsl_3 = sl_3 * 50000;
  const ttsl_4 = sl_4 * 20000;
  const ttsl_5 = sl_5 * 10000;
  const ttsl_6 = sl_6 * 5000;
  const ttsl_7 = sl_7 * 2000;
  const ttsl_8 = sl_8 * 1000;
  const ttsl_9 = sl_9 * 500;
  const ttsl_10 = sl_10 * 200;
  const TT =
    ttsl_1 +
    ttsl_11 +
    ttsl_2 +
    ttsl_3 +
    ttsl_4 +
    ttsl_5 +
    ttsl_6 +
    ttsl_7 +
    ttsl_8 +
    ttsl_9 +
    ttsl_10;
  return (
    <ImageBackground style={styles.image} source={require('../../../assets/Rectangle-76.png')}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? -250 : 0}
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : null}>
        <ScrollView>
          <View style={styles.viewForm}>
            <Form style={styles.login}>
              <View style={styles.title}>
                <Text style={styles.styletitle}>Bảng sao kê chi tiết</Text>
              </View>
              <View style={styles.table}>
                <View style={[styles.denominations, { alignItems: 'center' }]}>
                  <Text style={styles.styletitle}>Mệnh giá</Text>
                </View>
                <View style={styles.amount}>
                  <Text style={styles.styletitle}>Số lượng</Text>
                </View>
                <View style={[styles.intomoney, { alignItems: 'center' }]}>
                  <Text style={styles.styletitle}>Thành tiền</Text>
                </View>
              </View>
              <InputStatement
                title="500,000 VNĐ"
                add={() => setSl_1(sl_1 + 1)}
                reduce={() => setSl_1(sl_1 - 1)}
                value={sl_1}
                tt={ttsl_1.toLocaleString('en-US')}
              />
              <InputStatement
                title="200,000 VNĐ"
                add={() => setSl_11(sl_11 + 1)}
                reduce={() => setSl_11(sl_11 - 1)}
                value={sl_11}
                tt={ttsl_11.toLocaleString('en-US')}
              />
              <InputStatement
                title="100,000 VNĐ"
                add={() => setSl_2(sl_2 + 1)}
                reduce={() => setSl_2(sl_2 - 1)}
                value={sl_2}
                tt={ttsl_2.toLocaleString('en-US')}
              />
              <InputStatement
                title="50,000 VNĐ"
                add={() => setSl_3(sl_3 + 1)}
                reduce={() => setSl_3(sl_3 - 1)}
                value={sl_3}
                tt={ttsl_3.toLocaleString('en-US')}
              />
              <InputStatement
                title="20,000 VNĐ"
                add={() => setSl_4(sl_4 + 1)}
                reduce={() => setSl_4(sl_4 - 1)}
                value={sl_4}
                tt={ttsl_4.toLocaleString('en-US')}
              />
              <InputStatement
                title="10,000 VNĐ"
                add={() => setSl_5(sl_5 + 1)}
                reduce={() => setSl_5(sl_5 - 1)}
                value={sl_5}
                tt={ttsl_5.toLocaleString('en-US')}
              />
              <InputStatement
                title="5,000 VNĐ"
                add={() => setSl_6(sl_6 + 1)}
                reduce={() => setSl_6(sl_6 - 1)}
                value={sl_6}
                tt={ttsl_6.toLocaleString('en-US')}
              />
              <InputStatement
                title="2,000 VNĐ"
                add={() => setSl_7(sl_7 + 1)}
                reduce={() => setSl_7(sl_7 - 1)}
                value={sl_7}
                tt={ttsl_7.toLocaleString('en-US')}
              />
              <InputStatement
                title="1,000 VNĐ"
                add={() => setSl_8(sl_8 + 1)}
                reduce={() => setSl_8(sl_8 - 1)}
                value={sl_8}
                tt={ttsl_8.toLocaleString('en-US')}
              />
              <InputStatement
                title="500 VNĐ"
                add={() => setSl_9(sl_9 + 1)}
                reduce={() => setSl_9(sl_9 - 1)}
                value={sl_9}
                tt={ttsl_9.toLocaleString('en-US')}
              />
              <InputStatement
                title="200 VNĐ"
                add={() => setSl_10(sl_10 + 1)}
                reduce={() => setSl_10(sl_10 - 1)}
                value={sl_10}
                tt={ttsl_10.toLocaleString('en-US')}
              />
              <View style={styles.table}>
                <View
                  style={[
                    styles.denominations,
                    { flex: 6, alignItems: 'flex-end', borderBottomLeftRadius: 8 },
                  ]}>
                  <Text style={[styles.styletitle, { paddingRight: 5 }]}>Tổng tiền</Text>
                </View>
                <View
                  style={[
                    styles.intomoney,
                    { flex: 4, borderLeftWidth: 1, borderBottomRightRadius: 8 },
                  ]}>
                  <Text style={styles.styletitle}>{TT.toLocaleString('en-US')} VNĐ</Text>
                </View>
              </View>
            </Form>
            <Button
              onPress={() => navigation.navigate('Home')}
              abpButton
              style={{
                backgroundColor: '#2CD1F8',
                marginVertical: '5%',
                borderRadius: 8,
              }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {'Hoàn tất tạo đơn'.toUpperCase()}
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
Statement.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: Statement,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
const styles = StyleSheet.create({
  viewForm: { width: '90%', alignItems: 'center', marginLeft: '5%', backgroundColor: 'white' },
  login: {
    width: '100%',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  title: {
    flex: 1,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  table: { height: 40, flexDirection: 'row' },
  denominations: {
    flex: 3,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amount: {
    flex: 3,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intomoney: {
    flex: 4,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  styletitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 5,
  },
});
