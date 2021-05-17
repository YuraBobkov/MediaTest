export type Listener<T> = (value: T) => void;

export type Unsubscribe = () => void;

export type Handler<Value, Data> = (
  value: Value,
  controller: AbortController,
) => Promise<Data>;

export type State<Data> = {
  done: boolean;
  pending: boolean;
  data: Data | null;
  error: any;
};

export type Task<Data> = {
  promise: Promise<Data>;
  abort(): void;
};

export type Effect<Value, Data> = {
  getState(): State<Data>;
  run(value: Value): Task<Data>;
  updateHandler(handler: Handler<Value, Data>): void;
  onChange(fn: Listener<State<Data>>): Unsubscribe;
  onDone(fn: Listener<Data>): Unsubscribe;
  onError(fn: Listener<any>): Unsubscribe;
  destroy(): void;
};
