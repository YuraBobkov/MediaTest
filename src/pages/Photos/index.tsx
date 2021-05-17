import { Button } from '@material-ui/core';
import React, { FC, Fragment, useCallback, useMemo, useState } from 'react';

import SearchInput from 'src/components/SearchInput';
import Spinner from 'src/components/Spinner';
import config from 'src/config';
import { useTypedSelector } from 'src/redux';
import { useFindPhotos } from 'src/redux/entities/photos/hooks';
import { getAllPhotosIds } from 'src/redux/entities/photos/selectors';
import { getOptions } from 'src/utils/storage';
import { useEffectState } from 'src/utils/useAsyncEffect';

import Photo from './Photo';
import { useStyles } from './styles';

const Photos: FC = () => {
  const token = localStorage.getItem('token');
  const classes = useStyles();

  const [query, setQuery] = useState('');

  const searchOptions = getOptions();
  const photosIds = useTypedSelector(getAllPhotosIds);

  const findPhotosEffect = useFindPhotos();
  const { pending } = useEffectState(findPhotosEffect);

  const handleSearch = useCallback(() => {
    findPhotosEffect.run({ query });
  }, [findPhotosEffect, query]);

  const handleChange = useCallback((value) => {
    setQuery(value);
  }, []);

  const loginButton = useMemo(
    () =>
      token ? (
        <Button
          color="primary"
          variant="contained"
          onClick={() => localStorage.removeItem('token')}
        >
          Log out
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          component="a"
          href={`https://unsplash.com/oauth/authorize?client_id=${
            config.apiClientId
          }&response_type=code&redirect_uri=${encodeURIComponent(
            'http://localhost:3000/auth',
          )}&scope=public+write_likes`}
        >
          Log In
        </Button>
      ),
    [token],
  );

  return (
    <Fragment>
      <div className={classes.nav}>
        <SearchInput
          options={searchOptions}
          action={handleSearch}
          onChange={handleChange}
        />
        {loginButton}
      </div>
      <ul className={classes.list}>
        {photosIds.map((id) => (
          <Photo key={id} id={id as string} />
        ))}
        {pending && <Spinner />}
      </ul>
    </Fragment>
  );
};

export default Photos;
