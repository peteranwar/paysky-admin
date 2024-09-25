import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUserData: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...action.payload,
      };
    },
    logOut: () => {
      localStorage.removeItem('user');
      return {
        state: null
      };
    },
  },
});

export const { addUserData, logOut } = userSlice.actions;
export default userSlice.reducer;
