import React, { FC } from 'react';
import { NOT_FOUND } from '@routo/core';
import { useRouterState } from '@routo/react';

import { PHOTOS, AUTH } from 'src/router/ids';
import Photos from 'src/pages/Photos';
import Auth from 'src/pages/Auth';
import NotFound from 'src/pages/NotFound';

type Mapping = { [id: string]: FC };

const mapping: Mapping = {
  [PHOTOS]: Photos,
  [AUTH]: Auth,
  [NOT_FOUND]: NotFound,
};

const Router: FC = () => {
  const { id } = useRouterState();
  const Component = mapping[id];

  return <Component />;
};

export default Router;
