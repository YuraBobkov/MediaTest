import { useState, useEffect } from 'react';

import { Effect } from './types';

const useEffectState = <Value, Data>(effect: Effect<Value, Data>) => {
  const [state, setState] = useState(effect.getState());

  useEffect(() => {
    const unsubscribe = effect.onChange(setState);

    return unsubscribe;
  }, [effect]);

  return state;
};

export default useEffectState;
