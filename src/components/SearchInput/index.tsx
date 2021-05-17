import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { FC, useCallback, useRef } from 'react';
import { saveOptions } from 'src/utils/storage';

import { useStyles } from './styles';

type Props = {
  options: any[] | null;
  action(a: string): void;
};

const SearchInput: FC<Props> = ({ options, action }) => {
  const classes = useStyles();

  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const value = ref.current?.value!;

      action(value);
      saveOptions(value);
    },
    [action],
  );

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <input
        ref={ref}
        autoComplete="off"
        list="id"
        className={classes.input}
        placeholder="Photo Search"
      />

      <datalist id="id">
        {options &&
          options.map((value) => <option key={value} value={value} />)}
      </datalist>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
