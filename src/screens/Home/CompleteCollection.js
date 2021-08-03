import { H1, Button, Text, View } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import CardCollection from '../../components/Collection/Card';

function Statement() {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewSuccess}>
          <Image style={styles.image} source={require('../../../assets/success.png')} />
          <H1 style={styles.titleTH}>
            {i18n.t('FinCCP::CcpCollection.YouHaveCompletedTheCollectionAtTheStore')}
          </H1>
        </View>
        <CardCollection
          name={data.storeName}
          andress={data.storeAddress}
          total={data.total}
          staff={data.staff}
          requestDateTime={data.requestDateTime}
          storeLogo={data.storeLogo}
          storePhone={data.storePhone}
          grabPhone={data.grabPhone}
        />
        <Button style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.titleHT}> {i18n.t('FinCCP::CcpCollection.BackToHomePage')}</Text>
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default Statement;
const styles = StyleSheet.create({
  viewSuccess: {
    alignItems: 'center',
    width: '95%'
  },
  image: { marginTop: 20, width: 112, height: 112 },
  container: { flex: 1, alignItems: 'center' },
  titleTH: { fontSize: 18, color: '#C52AFE', fontWeight: 'bold', marginBottom: 10 },
  titlename: { fontSize: 18, fontWeight: 'bold', marginVertical: '10%' },
  button: {
    backgroundColor: '#2CD1F8',
    borderRadius: 8,
    marginTop: '5%',
    width: '94%',
    justifyContent: 'center',
    marginBottom: 10
  },
  titleHT: {
    color: 'white',
    fontWeight: 'bold',
  },
});
