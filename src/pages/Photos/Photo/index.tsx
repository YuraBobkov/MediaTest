import { IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useLikePhoto, useUnlikePhoto } from 'src/redux/entities/photos/hooks';
import { Photo as PhotoType } from 'src/redux/entities/photos/types';
import { useStyles } from './styles';

type Props = Pick<
  PhotoType,
  'urls' | 'alt_description' | 'id' | 'liked_by_user'
>;

const Photo: FC<Props> = ({ urls, alt_description, id, liked_by_user }) => {
  const classes = useStyles();

  const [spans, setSpans] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const likeEffect = useLikePhoto();
  const unlikeEffect = useUnlikePhoto();

  const handleClick = useCallback(
    () => (liked_by_user ? unlikeEffect.run(id) : likeEffect.run(id)),
    [id, likeEffect, liked_by_user, unlikeEffect],
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
    <div style={{ gridRowEnd: `span ${spans}` }} className={classes.wrapper}>
      <img
        className={classes.image}
        ref={imageRef}
        alt={alt_description}
        src={urls!.small}
      />
      <IconButton
        color="secondary"
        onClick={handleClick}
        className={classes.icon}
      >
        {liked_by_user ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </div>
  );
};

export default Photo;
