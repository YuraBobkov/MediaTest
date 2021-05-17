import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    wrapper: {
      position: 'relative',
    },

    image: {
      objectFit: 'contain',
    },

    icon: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
  },
  { name: 'Photo' },
);
