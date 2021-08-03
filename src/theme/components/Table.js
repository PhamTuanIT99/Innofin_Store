import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['MỆNH GIÁ', 'SỐ LƯỢNG', 'THÀNH TIỀN'],
      tableData: [
        ['500,000 đ', '5', '2,500,000'],
        ['200,000 đ', '12', '6,000,000'],
        ['100,000 đ', '3', '300,000'],
        ['50,000 đ', '2', '100,000'],
        ['20,000 đ', '10', '200,000'],
        ['10,000 đ', '0', '0'],
        ['5,000 đ', '0', '0'],
        ['2,000 đ', '0', '0'],
        ['1,000 đ', '0', '0'],
        ['TỔNG CỘNG', '', '9,000,000'],
      ],
    };
  }

  render() {
    const state = this.state;
    return (
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text,styles.textHeader} />
          <Rows data={state.tableData} textStyle={styles.text} />
        </Table>
    );
  }
}

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  textHeader: { fontWeight: 'bold', textAlign: 'center' },
  text: { margin: 6, textAlign: 'right', paddingRight: 10 },
});
