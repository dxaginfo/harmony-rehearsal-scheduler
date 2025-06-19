import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Import reducers
import authReducer from '../features/auth/authSlice';
import rehearsalReducer from '../features/rehearsals/rehearsalSlice';
import groupReducer from '../features/groups/groupSlice';
import resourceReducer from '../features/resources/resourceSlice';
import userReducer from '../features/users/userSlice';

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  rehearsals: rehearsalReducer,
  groups: groupReducer,
  resources: resourceReducer,
  users: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
