import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'authorization',
  initialState: {
    isLoggedIn: true,
    isInitialized: false,
  },
  // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному
  // оператору case в switch, как мы делали раньше (обычный redux)
  reducers: create => ({

    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean; }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),

    setIsInitialized: create.reducer<{ isInitialized: boolean; }>((state, action) => {
      state.isInitialized = action.payload.isInitialized;
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsInitialized: state => state.isInitialized,
  },
});

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions;
// Создаем reducer при помощи slice
export const authReducer = authSlice.reducer;
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors;