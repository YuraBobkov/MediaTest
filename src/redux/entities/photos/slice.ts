import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { saveEntities } from '../actions';
import { Entities } from '../types';
import adapter from './adapter';
import { NAMESPACE, PHOTOS } from './consts';

export default createSlice({
  name: NAMESPACE,
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      saveEntities.type,
      (state, action: PayloadAction<Entities>) =>
        action.payload[PHOTOS]
          ? adapter.upsertMany(state, action.payload[PHOTOS])
          : state,
    );
  },
});
