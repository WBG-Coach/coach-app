import {Keyboard} from 'react-native';
import {FormValuesType} from '../screens/CoachForm';
import {COUNTRY} from '@env';

export const createAccountFormValidate = (values: FormValuesType) => {
  let errors: any = {};
  Keyboard.dismiss();

  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.surname) {
    errors.surname = 'Required';
  }
  if (COUNTRY === 'np' && !values.email) {
    errors.email = 'Required';
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
