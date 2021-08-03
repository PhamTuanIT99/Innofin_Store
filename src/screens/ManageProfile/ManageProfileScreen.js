import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateProfileDetail, getProfileDetail } from '../../api/IdentityAPI';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import UpdateProfile from '../Users/UpdateProfile';
import { Alert } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

function ManageProfileScreen({ startLoading, stopLoading }) {
  const [user, setUser] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      startLoading({ key: 'manageProfile' });
      getProfileDetail()
        .then((data = {}) => setUser(data))
        .finally(() => stopLoading({ key: 'manageProfile' }));
    }
  });

  const submit = data => {
    startLoading({ key: 'manageProfile' });

    updateProfileDetail(data)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          Alert.alert(i18n.t('FinCCP::SucessfullyUpdated'));
          navigation.goBack();
        }
      })
      .finally(() => stopLoading({ key: 'manageProfile' }));
  };

  return (
    <>
      {user ? (
        <UpdateProfile editingUser={user} submit={submit} cancel={() => navigation.goBack()} />
      ) : null}
    </>
  );
}

ManageProfileScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: ManageProfileScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
