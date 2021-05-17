import { combineReducers } from '@reduxjs/toolkit';
import { createReducer } from '@routo/redux';

import router from 'src/router';
import entities from './entities/reducer';

export default combineReducers({
  entities,
  router: createReducer(router),
});
