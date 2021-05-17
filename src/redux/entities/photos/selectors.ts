import { RootState } from '../../index';
import adapter from './adapter';

export const {
  selectById: getPhotoById,
  selectAll: getAllPhotos,
  selectIds: getAllPhotosIds,
} = adapter.getSelectors((state: RootState) => state.entities.photos);
