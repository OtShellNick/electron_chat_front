import { useAppSelector } from './hooks';

export const useGetUserFromStore = () =>
  useAppSelector((state) => state.user.user);

export const useGetTokenFromStore = () =>
  useAppSelector((state) => state.user.token);

export const useGetSettingsFromStore = () =>
  useAppSelector((state) => state.settings.settings);

export const useGetFriendsFromStore = () =>
  useAppSelector((state) => state.friends);
