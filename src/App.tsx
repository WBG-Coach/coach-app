import React from 'react';
import RootProvider from './providers';
import AppRoutes from './routes';
import './i18n';

const App = () => {
  return (
    <RootProvider>
      <AppRoutes />
    </RootProvider>
  );
};

export default App;
