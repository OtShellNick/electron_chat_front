import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISettings } from 'types/types.dict';
import { defaultSettings } from 'data/data';

// Define a type for the slice state
interface ISettingsState {
  settings: ISettings;
}

// Define the initial state using that type
const initialState: ISettingsState = {
  settings: defaultSettings,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
