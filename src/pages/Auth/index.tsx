import { useRouter } from '@routo/react';
import React, { FC, useEffect } from 'react';

import { getToken } from 'src/redux/auth/api';
import Spinner from 'src/components/Spinner';

const Auth: FC = () => {
  const { getState, replace } = useRouter();

  useEffect(() => {
    const code = getState().queryParams.code;
    if (code) {
      const token = getToken(code);
      localStorage.setItem('token', token.toString());
      // replace('/');
    }
  }, [getState, replace]);
  return <Spinner />;
};

export default Auth;
