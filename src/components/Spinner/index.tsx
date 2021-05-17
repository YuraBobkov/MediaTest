import React, { FC } from 'react';
import { Fade } from '@material-ui/core';

import { useStyles } from './styles';

type Props = {
  className?: string;
  delay?: string;
};

const Spinner: FC<Props> = ({ delay = '300ms' }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fade in style={{ transitionDelay: delay }}>
        <div className={classes.spinner} />
      </Fade>
    </div>
  );
};

export default Spinner;
