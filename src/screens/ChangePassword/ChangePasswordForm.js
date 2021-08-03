import { Formik } from 'formik';
import i18n from 'i18n-js';
import { Container, Content, Form, Input, InputGroup, Item, Icon, Label } from 'native-base';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';

const ValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  newPassword: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  newPassword1: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
});

function ChangePasswordForm({ submit, cancel }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPassword1, setShowNewPassword1] = useState(false);

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordRef1 = useRef();

  const onSubmit = values => {
    submit({
      ...values,
      newPasswordConfirm: values.newPassword,
    });
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={ValidationSchema}
      initialValues={{
        currentPassword: '',
        newPassword: '',
        newPassword1: '',
      }}
      onSubmit={values => onSubmit(values)}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
        <>
          <Container>
            <Content px20 style={{ backgroundColor: '#FBFBFD' }}>
              <Form style={styles.form}>
                <InputGroup abpInputGroup style={styles.inputHT}>
                  <Label abpLabel>{i18n.t('AbpIdentity::DisplayName:CurrentPassword')}</Label>
                  <Item>
                    <Input
                      ref={currentPasswordRef}
                      onSubmitEditing={() => newPasswordRef.current._root.focus()}
                      returnKeyType="next"
                      onChangeText={handleChange('currentPassword')}
                      onBlur={handleBlur('currentPassword')}
                      value={values.currentPassword}
                      secureTextEntry={!showCurrentPassword}
                    />
                    <Icon
                      active
                      name={showCurrentPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                  </Item>
                </InputGroup>
                {errors.currentPassword && touched.currentPassword ? (
                  <ValidationMessage>{errors.currentPassword}</ValidationMessage>
                ) : null}
                <InputGroup abpInputGroup style={styles.inputHT}>
                  <Label abpLabel>{i18n.t('AbpIdentity::DisplayName:NewPassword')}</Label>
                  <Item>
                    <Input
                      ref={newPasswordRef}
                      returnKeyType="next"
                      onSubmitEditing={() => newPasswordRef1.current._root.focus()}
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      value={values.newPassword}
                      secureTextEntry={!showNewPassword}
                    />
                    <Icon
                      name={showNewPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    />
                  </Item>
                </InputGroup>
                {errors.newPassword && touched.newPassword ? (
                  <ValidationMessage>{errors.newPassword}</ValidationMessage>
                ) : null}
                <InputGroup abpInputGroup style={styles.inputMM}>
                  <Label abpLabel>{i18n.t('FinCCP::CcpAccount.EnterANewPassword')}</Label>
                  <Item>
                    <Input
                      ref={newPasswordRef1}
                      returnKeyType="done"
                      onChangeText={handleChange('newPassword1')}
                      onBlur={handleBlur('newPassword1')}
                      value={values.newPassword1}
                      secureTextEntry={!showNewPassword1}
                    />
                    <Icon
                      name={showNewPassword1 ? 'eye-off' : 'eye'}
                      onPress={() => setShowNewPassword1(!showNewPassword1)}
                    />
                  </Item>
                </InputGroup>
                {errors.newPassword1 && touched.newPassword1 ? (
                  <ValidationMessage>{errors.newPassword1}</ValidationMessage>
                ) : null}
                <FormButtons
                  submit={() => {
                    if(values.newPassword == '' || values.currentPassword =='' || values.newPassword1 ==''){
                      Alert.alert(
                        i18n.t('FinCCP::CcpAccount.PleaseEnterANewPassword'),
                        i18n.t('FinCCP::CcpError.TryAgain'),
                        [
                          {
                            text: 'OK',
                          },
                        ],
                      );
                    }else{
                    if (values.newPassword === values.currentPassword) {
                      Alert.alert(
                        i18n.t('FinCCP::CcpChangePassword.Error'),
                        i18n.t('FinCCP::CcpError.TryAgain'),
                        [
                          {
                            text: 'OK',
                          },
                        ],
                      );
                    } else {
                      {
                        if (values.newPassword !== values.newPassword1) {
                          Alert.alert(
                            i18n.t('FinCCP::CcpError.TryAgain'),
                            i18n.t('FinCCP::CcpChangepassword.Change'),
                            [
                              {
                                text: 'OK',
                              },
                            ],
                          );
                        } else {
                          handleSubmit();
                        }
                      }
                    }}
                  }}
                  cancel={cancel}
                  isSubmitDisabled={!isValid}
                />
              </Form>
            </Content>
          </Container>
        </>
      )}
    </Formik>
  );
}

ChangePasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    paddingBottom: 60,
    paddingTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
  inputHT: { width: '90%', marginLeft: '5%' },
  inputMM: {
    width: '90%',
    marginLeft: '5%',
  },
});
