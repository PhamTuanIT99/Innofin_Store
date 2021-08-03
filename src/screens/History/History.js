import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import ListDeposit from './ListDeposit';
import ListCollector from './ListCollector';
import ListFunding from '../History/ListFundding';
import i18n from 'i18n-js';

export default class History extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab
            heading={i18n.t('FinCCP::CcpCollection.Collection')}
            textStyle={{ color: '#636363', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#2CD1F8' }}
            tabStyle={{ borderRightWidth: 1, borderRightColor: '#DDDDDD' }}
            activeTabStyle={{ borderRightWidth: 1, borderRightColor: '#DDDDDD' }}>
            <ListCollector />
          </Tab>
          <Tab
            heading={i18n.t('FinCCP::CcpHistory.Deposit')}
            textStyle={{ color: '#636363', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#2CD1F8' }}
            tabStyle={{ borderRightWidth: 1, borderRightColor: '#DDDDDD' }}
            activeTabStyle={{
              borderRightWidth: 1,
              borderRightColor: '#DDDDDD',
            }}>
            <ListDeposit />
          </Tab>
          {/* <Tab
            heading={i18n.t('FinCCP::CcpHistory.Funding')}
            textStyle={{ color: '#636363', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#2CD1F8' }}>
            <ListFunding />
          </Tab> */}
        </Tabs>
      </Container>
    );
  }
}
