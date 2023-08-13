import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseData } from 'types/action.types';
import type { RootState } from './store';

// Define a type for the slice state
interface IUserState {
  user: AuthResponseData;
  token: string;
}

// Define the initial state using that type
const initialState: IUserState = {
  user: {
    id: 0,
    login: '',
    email: '',
  },
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<{ user: AuthResponseData }>) => {
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.user = {
        id: 0,
        login: '',
        email: '',
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = '';
    },
  },
});

export const { setUser, removeUser, setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
