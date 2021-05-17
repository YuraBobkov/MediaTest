import { Button } from '@material-ui/core';
import React, { FC, Fragment, useCallback, useMemo } from 'react';

import SearchInput from 'src/components/SearchInput';
import config from 'src/config';
import { useTypedSelector } from 'src/redux';
import { useFindPhotos } from 'src/redux/entities/photos/hooks';
import { getAllPhotos } from 'src/redux/entities/photos/selectors';
import { getOptions } from 'src/utils/storage';

import Photo from './Photo';
import { useStyles } from './styles';

const Photos: FC = () => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  console.log('🚀 ~ token', token);

  const findPhotosEffect = useFindPhotos();

  const searchOptions = getOptions();
  const photos = useTypedSelector(getAllPhotos);

  const handleSearch = useCallback(
    (value) => {
      findPhotosEffect.run(value);
    },
    [findPhotosEffect],
  );

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
        <SearchInput options={searchOptions} action={handleSearch} />
        {loginButton}
      </div>
      <div className={classes.list}>
        {photos.map((photo) => (
          <Photo key={photo.id} {...photo} />
        ))}
      </div>
    </Fragment>
  );
};

export default Photos;
