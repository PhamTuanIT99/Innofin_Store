import { ListItem, Text, Left, View, Body } from 'native-base';
import React, { useState, useCallback } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import i18n from 'i18n-js';
import { getTypeIdentity } from '../../api/IdentityAPI';

function KYC() {
  const [type, setType] = useState({});

  const getType = () => {
    getTypeIdentity().then(data => {
      setType(data || {});
    });
  };
  useFocusEffect(
    useCallback(() => {
      getType();
    }, []),
  );
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../../assets/Rectangle-76.png')} style={styles.container}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
      <Text style={{ marginBottom: 5 }}>{i18n.t('FinCCP::CcpKYC.ChooseDocumentVerification')}</Text>
      <SafeAreaView style={styles.item}>
        <FlatList
          data={type.items}
          style={{ paddingHorizontal: 3 }}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <ListItem
                noIndent
                icon
                style={styles.list}
                onPress={() => navigation.navigate('CardKyc', { item })}>
                <Left>
                  {item.id === '8e69b365-2cf2-a01e-e8df-39fdb11659e0' ? (
                    <Image
                      style={styles.imageIcon}
                      source={require('../../../assets/iconCMT.png')}
                    />
                  ) : item.id === '877bcaaf-b14b-09d8-894b-39fdb116873f' ? (
                    <Image
                      style={styles.imageIcon}
                      source={require('../../../assets/iconCMT.png')}
                    />
                  ) : item.id === 'a49a11dc-925b-d84e-358f-39fdb116a7aa' ? (
                    <Image
                      style={styles.imageIcon}
                      source={require('../../../assets/iconHC.png')}
                    />
                  ) : item.id === '5542c81c-c52d-320a-e4c2-39fdb116d609' ? (
                    <Image
                      style={styles.imageIcon}
                      source={require('../../../assets/iconBLX.png')}
                    />
                  ) : (
                    <Image
                      style={styles.imageIcon}
                      source={require('../../../assets/iconOther.png')}
                    />
                  )}
                </Left>
                <Body style={styles.bodyStyle}>
                  <Text>{item.name}</Text>
                </Body>
              </ListItem>
            </View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
export default KYC;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFBFD', alignItems: 'center' },
  item: { width: '90%', height: '100%' },
  imageIcon: { width: 50, height: 50 },
  list: {
    height: 60,
    borderColor: 'grey',
    marginVertical: 5,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: '1%',
    width: '98%',
  },
  bodyStyle: {
    borderBottomWidth: null,
  },
});
