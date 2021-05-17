import { createPubSub } from 'src/utils/pubsub';

import { Handler, Effect } from './types';
import { getInitialState } from './utils';

import 'abort-controller/polyfill';

const createEffect = <Value, Data>(
  initialHandler: Handler<Value, Data>,
): Effect<Value, Data> => {
  const pubSub = createPubSub();

  let controller = new AbortController();
  let handler = initialHandler;
  let state = getInitialState<Data>();

  const handleStart = () => {
    state = {
      ...getInitialState(),
      done: false,
      pending: true,
    };

    pubSub.publish('change', state);
  };

  const handleDone = (error: Error | null, data?: Data) => {
    state = {
      done: true,
      pending: false,
      data: data || null,
      error,
    };

    pubSub.publish('change', state);

    if (error) {
      pubSub.publish('error', error);
    } else {
      pubSub.publish('done', data!);
    }
  };

  return {
    getState() {
      return state;
    },

    updateHandler(newHandler) {
      handler = newHandler;
    },

    run(value: Value) {
      controller.abort();
      handleStart();

      controller = new AbortController();

      const promise = handler(value, controller)
        .then((result) => {
          handleDone(null, result);

          return result;
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            handleDone(err);
          }

          throw err;
        });

      const task = {
        abort: controller.abort,
        promise,
      };

      promise.catch(() => {});

      return task;
    },

    onChange(fn) {
      return pubSub.subscribe('change', fn);
    },

    onDone(fn) {
      return pubSub.subscribe('done', fn);
    },

    onError(fn) {
      return pubSub.subscribe('error', fn);
    },

    destroy() {
      pubSub.destroy();
      controller.abort();
    },
  };
};

export default createEffect;
