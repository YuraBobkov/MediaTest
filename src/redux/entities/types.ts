import { Photo } from './photos/types';
import { PHOTOS } from './photos/consts';

export type Entities = {
  [PHOTOS]: { [id: string]: Photo };
};
