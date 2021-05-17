import { NAMESPACE } from './consts';

export const createActionName = (name: string) => `${NAMESPACE}/${name}`;
