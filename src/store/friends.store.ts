import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getPeopleByLogin } from 'actions/friends.actions';
import { IFriendData } from 'types/action.types';

// Define a type for the slice state
interface IFriendsState {
  friends: IFriendData[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// Define the initial state using that type
const initialState: IFriendsState = {
  friends: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const getUserFriends = createAsyncThunk<
  IFriendData[],
  string,
  { rejectValue: string }
>('friends/getFriends', (login, { rejectWithValue }) => {
  return getPeopleByLogin(login)
    .then((response) => {
      return response;
    })
    .catch((error) => rejectWithValue(error.response.data));
});

export const friendsSlice = createSlice({
  name: 'friends',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFriends: (state, action: PayloadAction<IFriendData[]>) => {
      state.friends = action.payload;
    },
    removeFriends: (state) => {
      state.friends = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserFriends.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFriends.fulfilled, (state, action) => {
      console.log('@@friends/getFriends', action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.friends = action.payload;
    });
    builder.addCase(getUserFriends.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setFriends, removeFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
