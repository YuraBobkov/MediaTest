import { useRef, useEffect } from 'react';

import createEffect from './createEffect';
import { Handler, Effect } from './types';

const useAsyncEffect = <Value, Data>(handler: Handler<Value, Data>) => {
  const effectRef = useRef<Effect<Value, Data> | null>(null);

  const getEffect = () => {
    const effect = effectRef.current;

    if (effect !== null) {
      return effect;
    }

    const newEffect = createEffect(handler);

    effectRef.current = newEffect;

    return newEffect;
  };

  const effect = getEffect();

  effect.updateHandler(handler);

  useEffect(() => () => effect.destroy(), [effect]);

  return effect;
};

export default useAsyncEffect;
