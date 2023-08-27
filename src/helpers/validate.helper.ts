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
