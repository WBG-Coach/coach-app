import React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef<any>();

const Navigation = {
  push: (name: string, params: object = {}): void => {
    navigationRef.current &&
      navigationRef.current.dispatch(StackActions.push(name, params));
  },
  navigate: (name: string, params: object = {}): void => {
    navigationRef?.current?.navigate(name, params);
  },
  goBack: (): void => {
    navigationRef?.current?.goBack();
  },
  replace: (name: string, params?: object | undefined) => {
    navigationRef?.current.dispatch(StackActions.replace(name, params));
  },
  reset: (name: string, params: object = {}) => {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  },
  resetWithIndex: (
    index: number,
    routes: {name: string; params?: Object}[],
  ) => {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  },
  resetByRoutes: (routes: any[]) => {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      }),
    );
  },
};

export const ServiceNavigation = Navigation;

export default Navigation;
