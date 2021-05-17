import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    nav: {
      display: 'flex',
      padding: 10,
    },

    list: {
      listStyleType: 'none',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
      gridGap: 0,
      padding: '2rem',
      gridAutoRows: 10,
      justifyItems: 'center',
    },
  },
  { name: 'Photos' },
);
