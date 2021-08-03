import React, { useState } from 'react';
import { ListItem, Text, Left, Body, Picker } from 'native-base';
import { StyleSheet, ImageBackground, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connectToRedux } from '../../utils/ReduxConnect';
import AppActions from '../../store/actions/AppActions';
import i18n from 'i18n-js';
import { Platform } from 'react-native';
import { Image } from 'react-native';
import {
  createLanguageSelector,
  createLanguagesSelector,
} from '../../store/selectors/AppSelectors';
import AlertComponent from '../../components/Alert/AlertComponet';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingProfile({ logoutAsync, language, languages, setLanguageAsync }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const RemoveToken = async () => {
    try {
      await AsyncStorage.removeItem('FirstPush');
    } catch (exception) { }
  };
  return (
    <ImageBackground
      source={require('../../../assets/Rectangle-76.png')}
      style={{ flex: 1, alignItems: 'center' }}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
      <View style={{ width: '90%' }}>
        <View style={styles.item}>
          <ListItem noIndent icon style={styles.list} onPress={() => navigation.navigate('Detail')}>
            <Left>
              <Image style={styles.imageIcon} source={require('../../../assets/info.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={styles.text}>{i18n.t('FinCCP::CcpAccount.Infomation')}</Text>
            </Body>
          </ListItem>
        </View>
        <View style={styles.item}>
          <ListItem noIndent icon style={styles.list} onPress={() => navigation.navigate('Change')}>
            <Left>
              <Image style={styles.imageIcon} source={require('../../../assets/oKhoa.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={styles.text}>{i18n.t('FinCCP::CcpAccount.ChangePassword')}</Text>
            </Body>
          </ListItem>
        </View>
        <View style={styles.item}>
          <ListItem noIndent icon style={styles.list}>
            <Left>
              <Image style={styles.imageIcon} source={require('../../../assets/setting.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Picker
                mode="dropdown"
                iosHeader={i18n.t('FinCCP::CcpAccount.Language')}
                onValueChange={value => setLanguageAsync(value)}
                selectedValue={language.cultureName}
                textStyle={styles.text}>
                {languages.map(lang => (
                  <Picker.Item
                    label={lang.displayName}
                    value={lang.cultureName}
                    key={lang.cultureName}
                  />
                ))}
              </Picker>
            </Body>
          </ListItem>
        </View>
        <View style={styles.item}>
          <ListItem
            abpButton
            noIndent
            icon
            style={styles.list}
            onPress={() => setModalVisible(true)}>
            <Left>
              <Image style={styles.imageIcon} source={require('../../../assets/logout.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
              <Text style={styles.text}>{i18n.t('FinCCP::CcpAccount.Logout')}</Text>
            </Body>
            <AlertComponent
              visible={modalVisible}
              title={i18n.t('FinCCP::CcpAccount.SignOut')}
              button1={() => setModalVisible(!modalVisible)}
              button2={() => logoutAsync(RemoveToken())}
            />
          </ListItem>
        </View>
      </View>
    </ImageBackground>
  );
}
SettingProfile.propTypes = {
  logoutAsync: PropTypes.func.isRequired,
  setLanguageAsync: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
};

export default connectToRedux({
  component: SettingProfile,
  dispatchProps: {
    setLanguageAsync: AppActions.setLanguageAsync,
    logoutAsync: AppActions.logoutAsync,
  },
  stateProps: state => ({
    languages: createLanguagesSelector()(state),
    language: createLanguageSelector()(state),
  }),
});
const styles = StyleSheet.create({
  imageIcon: { width: 50, height: 50 },
  text: {
    fontWeight: '600',
    fontSize: 17,
    paddingLeft: 0,
  },
  list: {
    height: 60,
    borderColor: 'grey',
    marginVertical: 5,
  },
  bodyStyle: {
    borderBottomWidth: null,
  },
  item: {
    backgroundColor: 'white',
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
    borderRadius: 10,
  },
});
