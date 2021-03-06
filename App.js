import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { StyleProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContainer } from './src/components/AppContainer';
import { initAPIInterceptor } from './src/interceptors/APIInterceptor';
import { persistor, store } from './src/store';
import getTheme from './src/theme/components';
import { activeTheme } from './src/theme/variables';
import { checkConnected } from './src/api/checkconnection';
import NoConnectionScreen from './src/screens/noConnectionScreen';

enableScreens();
initAPIInterceptor(store);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [connectStatus, setConnectStatus] = useState(false);

  checkConnected().then(res => {
    setConnectStatus(res);
  });
  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => setIsReady(true));
  }, []);

  return connectStatus ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isReady ? (
          <StyleProvider style={getTheme(activeTheme)}>
            <AppContainer />
          </StyleProvider>
        ) : null}
      </PersistGate>
    </Provider>
  ) : (
    <NoConnectionScreen onCheck={checkConnected} />
  );
}
