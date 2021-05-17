import { useDispatch } from 'react-redux';
import { useAsyncEffect } from 'src/utils/useAsyncEffect';
import { saveEntities } from '../actions';
import api from './api';

export const useFindPhotos = () => {
  const dispatch = useDispatch();
  return useAsyncEffect(async ({ query }: { query: string }) => {
    const { results } = await api.find({
      params: { query },
    });

    dispatch(saveEntities({ photos: results }));
  });
};

export const useLikePhoto = () => {
  return useAsyncEffect(async (id: string) => {
    await api.like(id);
  });
};

export const useUnlikePhoto = () => {
  return useAsyncEffect(async (id: string) => {
    await api.unlike(id);
  });
};
