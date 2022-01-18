import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import moviesSlice from './moviesSlice';
import { rootReducer } from './rootReducer';

const initialState = { value: 0 }


export const store = configureStore({
    reducer: rootReducer,
    // preloadedState: initialState,
    

    // reducer: {
    //   counter: counterReducer,
    //   movies: moviesSlice,
    // }
  });

  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;