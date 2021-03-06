import { Toast } from 'native-base';
import i18n from 'i18n-js';
import api from '../api/API';
import PersistentStorageActions from '../store/actions/PersistentStorageActions';
import LoadingActions from '../store/actions/LoadingActions';
import NetInfo from '@react-native-community/netinfo';

export function initAPIInterceptor(store) {
  api.interceptors.request.use(
    async request => {
      const {
        persistentStorage: { token, language, tenant },
      } = store.getState();

      if (!request.headers.Authorization && token && token.access_token) {
        request.headers.Authorization = `${token.token_type} ${token.access_token}`;
      }

      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json';
      }

      if (!request.headers['Accept-Language'] && language) {
        request.headers['Accept-Language'] = language;
      }

      if (!request.headers.__tenant && tenant && tenant.tenantId) {
        request.headers.__tenant = tenant.tenantId;
      }

      return request;
    },
    error => console.error(error),
  );

  api.interceptors.response.use(
    response => response,
    error => {
      store.dispatch(LoadingActions.clear());
      const errorRes = error.response;
      if (errorRes) {
        if (errorRes.headers._abperrorformat && errorRes.status === 401) {
          store.dispatch(PersistentStorageActions.setToken({}));
        }

        showError({ error: errorRes.data.error || {}, status: errorRes.status });
      } else {
        let isConn = true;

        NetInfo.fetch().then(state => {
          isConn = state.isConnected;
        });
        Toast.show({
          text: isConn ? i18n.t('FinCCP::CcpError.Network') : i18n.t('FinCCP::CcpError.Internet'),
          buttonText: 'x',
          duration: 4000,
          type: 'danger',
          textStyle: { textAlign: 'center' },
        });
      }

      return Promise.reject(error);
    },
  );
}

function showError({ error = {}, status }) {
  let message = '';
  let title = i18n.t('FinCCP::CcpError.Msg');

  if (typeof error === 'string') {
    if (error == 'invalid_grant') {
      title = i18n.t('FinCCP::CcpError.InvalidPass');
      message = i18n.t('FinCCP::CcpError.TryAgain');
    } else {
      message = error;
    }
  } else if (error.details) {
    message = error.details;
    title = error.message;
  } else if (error.message) {
    message = error.message;
  } else {
    switch (status) {
      case 401:
        title = i18n.t('AbpAccount::DefaultErrorMessage401');
        message = i18n.t('AbpAccount::DefaultErrorMessage401Detail');
        break;
      case 403:
        title = i18n.t('AbpAccount::DefaultErrorMessage403');
        message = i18n.t('AbpAccount::DefaultErrorMessage403Detail');
        break;
      case 404:
        title = i18n.t('AbpAccount::DefaultErrorMessage404');
        message = i18n.t('AbpAccount::DefaultErrorMessage404Detail');
        break;
      case 500:
        title = i18n.t('AbpAccount::500Message');
        message = i18n.t('AbpAccount::InternalServerErrorMessage');
        break;
      default:
        break;
    }
  }
  Toast.show({
    text: `${title}\n${message}`,
    buttonText: 'x',
    duration: 4000,
    type: 'danger',
    textStyle: { textAlign: 'center' },
  });
}
