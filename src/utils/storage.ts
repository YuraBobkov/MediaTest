export const createStorage = (key: string) => ({
  get<T>(): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return null;
    }
  },

  set<T>(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
});

const storage = createStorage('queryOptions');

export const getOptions = (): any[] | null => storage.get();

export const saveOptions = (option: string) => {
  const options = getOptions();

  if (options?.length === 5) {
    options.splice(0, 1);
  }
  const newSet = new Set(options);
  newSet.add(option);

  storage.set(Array.from(newSet));
};
