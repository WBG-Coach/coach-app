import {Keyboard} from 'react-native';
import {FormValuesType} from '../screens/CreateAccount';
import {LoginFormType} from '../screens/Login';

export const loginFormValidate = (values: LoginFormType) => {
  let errors: any = {};
  Keyboard.dismiss();

  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const createAccountFormValidate = (values: FormValuesType) => {
  let errors: any = {};
  Keyboard.dismiss();

  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.surname) {
    errors.surname = 'Required';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.password = 'Passwords do not match';
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

export const teacherFormValidate = (values: FormValuesType) => {
  let errors: any = {};
  Keyboard.dismiss();

  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.surname) {
    errors.surname = 'Required';
  }

  return errors;
};
