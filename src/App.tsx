import React from 'react';
import RootProvider from './providers';
import AppRoutes from './routes';
import './i18n';
import {database} from './database';
import User from './database/models/User';

const App = () => {
  return (
    <RootProvider>
      <AppRoutes />
    </RootProvider>
  );
};

export default App;
