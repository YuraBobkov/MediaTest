import { State } from './types';

export const getInitialState = <Data>(): State<Data> => ({
  done: false,
  pending: false,
  data: null,
  error: null,
});
