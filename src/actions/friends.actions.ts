import apiClient from 'helpers/server';
import { IFriendData } from 'types/action.types';

export const getPeopleByLogin = (loginToFind: string): Promise<IFriendData[]> =>
  apiClient.get(`/search-for-login?limit=10&offset=0&login=${loginToFind}`);
