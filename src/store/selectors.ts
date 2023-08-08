import { useAppSelector } from './hooks';

export const getUserFromStore = () =>
  useAppSelector((state) => state.user.user);
