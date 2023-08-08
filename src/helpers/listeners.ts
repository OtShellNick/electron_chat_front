import { createEventListener } from './notify';
import { AuthResponseData } from 'types/action.types';

export const userDataListener = createEventListener<AuthResponseData>('userData');
