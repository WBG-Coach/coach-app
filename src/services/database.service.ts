import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {COUNTRY} from '@env';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {name: `v2_coachdb`, location: 'default'},
    () => console.log('Database connected!'),
    err => console.log('err! ', err),
  );
};
