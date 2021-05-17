import { RootState } from '../../index';
import adapter from './adapter';

export const { selectById, selectAll: getAllPhotos } = adapter.getSelectors(
  (state: RootState) => state.entities.photos,
);
