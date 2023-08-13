import { AuthResponseData } from 'types/action.types';
import { createEventListener } from './notify';

export const userDataListener =
  createEventListener<AuthResponseData>('userData');

export const authTokenListener = createEventListener<string>('token');
