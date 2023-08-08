import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseData } from 'types/action.types';
import type { RootState } from './store';

// Define a type for the slice state
interface User {
  user: AuthResponseData;
}

// Define the initial state using that type
const initialState: User = {
  user: {
    id: '',
    login: '',
    email: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload.user;
    }
  }
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
