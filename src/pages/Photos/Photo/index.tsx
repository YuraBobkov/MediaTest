import { IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useLikePhoto, useUnlikePhoto } from 'src/redux/entities/photos/hooks';
import { useStyles } from './styles';
import { getPhotoById } from 'src/redux/entities/photos/selectors';
import { useTypedSelector } from 'src/redux';

type Props = { id: string };

const Photo: FC<Props> = ({ id }) => {
  const classes = useStyles();
  const photo = useTypedSelector((state) => getPhotoById(state, id))!;

  const [spans, setSpans] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const likeEffect = useLikePhoto();
  const unlikeEffect = useUnlikePhoto();

  const handleClick = useCallback(
    () => (photo.liked_by_user ? unlikeEffect.run(id) : likeEffect.run(id)),
    [id, likeEffect, photo.liked_by_user, unlikeEffect],
  );

  const calculateSpans = () => {
    imageRef!.current!.height =
      Math.round(imageRef!.current!.clientHeight / 10) * 10;
    const height = imageRef!.current!.clientHeight;

    const spans = Math.ceil(height / 10) + 1;

    setSpans(spans);
  };
  useEffect(
    () => imageRef!.current!.addEventListener('load', calculateSpans),
    [],
  );

  return (
    <li style={{ gridRowEnd: `span ${spans}` }} className={classes.wrapper}>
      <img
        className={classes.image}
        ref={imageRef}
        alt={photo.alt_description}
        src={photo.urls.small}
      />
      <IconButton
        color="secondary"
        onClick={handleClick}
        className={classes.icon}
      >
        {photo.liked_by_user ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </li>
  );
};

export default Photo;
