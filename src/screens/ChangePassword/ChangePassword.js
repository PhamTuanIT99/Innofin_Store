import React from 'react';
import PropTypes from 'prop-types';
import { changePassword } from '../../api/IdentityAPI';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import ChangePasswordForm from './ChangePasswordForm';
import { Alert } from 'react-native';
import AppActions from '../../store/actions/AppActions';
import i18n from 'i18n-js';

function ChangePasswordScreen({ startLoading, stopLoading, navigation, logoutAsync }) {
  const submit = data => {
    startLoading({ key: 'changePassword' });

    changePassword(data)
      .then(() => {
        Alert.alert(
          i18n.t('FinCCP::CcpAccount.ChangePasswordSuccessfully'),
          i18n.t('FinCCP::CcpLogin.PleaseLoginAgain'),
          [
            {
              text: 'Ok',
              onPress: () => logoutAsync(),
            },
          ],
        );
      })
      .finally(() => stopLoading({ key: 'changePassword' }));
  };

  return <ChangePasswordForm submit={submit} cancel={() => navigation.goBack()} />;
}

ChangePasswordScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  logoutAsync: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: ChangePasswordScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    logoutAsync: AppActions.logoutAsync,
  },
});
