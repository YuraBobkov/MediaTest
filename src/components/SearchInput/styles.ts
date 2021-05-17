import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  root: {
    padding: '2px 4px',
    margin: [0, 'auto'],
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    marginLeft: 16,
    flex: 1,
    font: 'inherit',
    color: 'currentColor',
    width: '100%',
    border: 0,
    height: '1.1876em',
    margin: 0,
    display: 'block',
    padding: '6px 0 7px',
    minWidth: 0,
    background: 'none',
    boxSizing: 'content-box',
    animationName: 'mui-auto-fill-cancel',
    letterSpacing: 'inherit',
    animationDuration: '10ms',
    WebkitTapHighlightColor: 'transparent',

    '&:focus-visible': {
      outline: 'none',
    },

    '&::-webkit-calendar-picker-indicator': {
      display: 'none',
    },
  },
  iconButton: {
    padding: 10,
  },
});
