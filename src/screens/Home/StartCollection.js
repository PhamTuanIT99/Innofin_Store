import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { startRequest } from '../../api/CollectionAPI';
import i18n from 'i18n-js';
import React, { useCallback, useState } from 'react';
import CardCollection from '../../components/Collection/Card';
import SliderCollection from '../../components/Collection/Slider';
import { Icon } from 'native-base';
import { GetlistNotify } from '../../api/NotificationAPI';
import { Badge } from 'react-native-elements';

function StartCollection() {
  const route = useRoute();
  const { data, location } = route.params;
  const navigation = useNavigation();
  const genStatement = statements => {
    let total = 0;
    let result = [];
    statements.forEach(item => {
      let n = {};
      n.d = item.denomination;
      n.q = item.quantity;
      n.t = item.denomination * item.quantity;
      result.push(n);
      total += item.denomination * item.quantity;
    });
    result.reverse();

    let tt = {};
    tt.d = i18n.t('FinCCP::CcpCollection.TotalAmount');
    (tt.q = ''), (tt.t = total);
    result.push(tt);
    return result;
  };
  const [seen, setSeen] = useState(0);
  const fetchNotify = () => {
    GetlistNotify().then(data => {
      setSeen(data.totalUnSeen || {});
    });
  };
  useFocusEffect(
    useCallback(() => {
      fetchNotify();
    }, []),
  );
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../../assets/Rectangle69.png')} style={styles.bgrImage}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.goback} onPress={() => navigation.popToTop(1)}>
            <Icon style={{ color: 'white' }} name="chevron-back-outline" />
          </TouchableOpacity>
          <Text style={styles.title}>{i18n.t('FinCCP::CcpCollection.StartCollection')}</Text>
          <TouchableOpacity
            style={styles.notify}
            onPress={() => navigation.navigate('Notifycation')}
          >
            <View>
              <Icon style={{ color: 'white' }} name="notifications-outline" />
              {seen > 0 ? (
                <Badge
                  value={seen}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <SafeAreaView style={styles.container}>
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
            <SliderCollection
              tutorial={i18n.t('FinCCP::CcpCollection.TutorialStartCollection')}
              onSlider={() => {
                startRequest().then(result => {
                  if (result.error) {
                  } else {
                    let listS = genStatement(data.statement);
                    navigation.navigate('Statement', { data, listS, location });
                  }
                });
              }}
              titleSlider={i18n.t('FinCCP::CcpCollection.StartCollection')}
            />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
export default StartCollection;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  bgrImage: { width: '100%', height: '100%' },
  header: {
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : null,
  },
  goback: { marginLeft: 5, padding: 10 },
  title:
    Platform.OS === 'ios'
      ? { fontSize: 16, color: 'white', fontWeight: '600' }
      : { fontSize: 19, color: 'white', fontWeight: '700' },
  notify: {
    paddingVertical: 27,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: Platform.OS === 'ios' ? null : 25,
  },
});
