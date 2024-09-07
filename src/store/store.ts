import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import movieReducer from './movieSlice';
const persistConfig = {
  key: 'root', 
  storage,
};
  /**
   * Middleware configuration for the store.
   * 
   * - We ignore the 'persist/PERSIST' and 'persist/REHYDRATE' actions because they are not serializable.
   * - We ignore the 'movies.entities' and 'movies.ids' paths because they are not serializable.
   * 
   * @remarks
   * See: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
   */
const persistedMovieReducer = persistReducer(persistConfig, movieReducer);
const store = configureStore({
  reducer: {
    movies: persistedMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['movies.entities', 'movies.ids'],
      },
    }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

export { store, persistor };