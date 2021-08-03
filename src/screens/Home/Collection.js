import React, { useCallback, useState } from 'react';
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
import { takeRequest } from '../../api/CollectionAPI';
import i18n from 'i18n-js';
import CardCollection from '../../components/Collection/Card';
import SliderCollection from '../../components/Collection/Slider';
import { Icon } from 'native-base';
import { GetlistNotify } from '../../api/NotificationAPI';
import { Badge } from 'react-native-elements';

function Collection() {
  const route = useRoute();
  const { Data, location } = route.params;
  const navigation = useNavigation();
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
          <TouchableOpacity style={styles.goback} onPress={() => navigation.navigate('Home')}>
            <Icon style={{ color: 'white' }} name="chevron-back-outline" />
          </TouchableOpacity>
          <Text style={styles.title}>{i18n.t('FinCCP::CcpCollection.Collection')}</Text>
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
              name={Data.storeName}
              andress={Data.storeAddress}
              total={Data.total}
              staff={Data.staff}
              requestDateTime={Data.requestDateTime}
              storeLogo={Data.storeLogo}
              storePhone={Data.storePhone}
              grabPhone={Data.grabPhone}
            />
            <SliderCollection
              tutorial={i18n.t('FinCCP::CcpCollection.TutorialCollection')}
              onSlider={() => {
                takeRequest(Data.id).then(data => {
                  if (data.error) {
                  } else {
                    navigation.navigate('StartCollection', { data, location });
                  }
                });
              }}
              titleSlider={i18n.t('FinCCP::CcpCollection.StartMoving')}
            />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
export default Collection;
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
      : { fontSize: 18, color: 'white', fontWeight: 'bold' },
  notify: {
    paddingVertical: 27,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: Platform.OS === 'ios' ? null : 25,
  },
});
