import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RoutoProvider } from '@routo/react';

import { store } from 'src/redux';
import router from 'src/router';
import Router from 'src/components/Router';

const Root: FC = () => (
  <ReduxProvider store={store}>
    <RoutoProvider router={router}>
      <Router />
    </RoutoProvider>
  </ReduxProvider>
);

export default Root;
