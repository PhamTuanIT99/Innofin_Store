import { Icon, Text } from 'native-base';
import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function InputStatement({ add, reduce, value, tt, title }) {
  return (
    <View style={styles.table}>
      <View style={styles.denominations}>
        <Text style={styles.styletitle}>{title}</Text>
      </View>
      <View style={styles.amount}>
        <TouchableOpacity onPress={reduce}>
          <Icon name="remove-circle" style={{ color: 'red', fontSize: 18 }} />
        </TouchableOpacity>
        <Text style={{ paddingHorizontal: 8 }}>{value}</Text>
        <TouchableOpacity onPress={add}>
          <Image source={require('../../../assets/add.png')} style={{ width: 22, height: 22 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.intomoney}>
        <Text style={styles.styletitle}>{tt} VNĐ</Text>
      </View>
    </View>
  );
}

InputStatement.propTypes = {
  value: PropTypes.number,
  tt: PropTypes.string,
  title: PropTypes.string,
  reduce: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};
export default InputStatement;
const styles = StyleSheet.create({
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
  denominations: {
    flex: 3,
    borderLeftWidth: 1,
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
  table: { height: 40, flexDirection: 'row' },
});
