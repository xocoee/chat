import { createSlice } from '@reduxjs/toolkit';

const nameInLocalStorage = 'user';

const getInitialState = () => {
  const storedState = localStorage.getItem(nameInLocalStorage);
  return storedState ? JSON.parse(storedState) : { username: null, token: null };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      const userDataString = JSON.stringify(action.payload);
      localStorage.setItem(nameInLocalStorage, userDataString);
      return {
        ...state,
        username,
        token,
      };
    },
    removeCredentials: (state) => {
      localStorage.removeItem(nameInLocalStorage);
      return {
        ...state,
        username: null,
        token: null,
      };
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentUser = (state) => state.auth.username;
export const getCurrentToken = (state) => state.auth.token;
