import { combineReducers } from '@reduxjs/toolkit';

import postsSlice from './photos/slice';

export default combineReducers({
  photos: postsSlice.reducer,
});
