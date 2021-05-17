import { createApi } from 'src/utils/api';
import { Photo } from './types';

export default createApi<Photo>('search/photos');
