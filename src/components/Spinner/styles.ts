import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    '@keyframes around': {
      '0%': {
        transform: 'rotate(0)',
      },

      '100%': {
        transform: 'rotate(359deg)',
      },
    },

    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

    spinner: {
      animation: '$around 1s infinite linear',
      border: '10px solid',
      borderColor: '#000000',
      borderLeftColor: 'transparent',
      borderRadius: '50%',
      height: 50,
      width: 50,
    },
  }),
  { name: 'Spinner' },
);
