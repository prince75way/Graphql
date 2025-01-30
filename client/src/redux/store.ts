import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage
import { userService } from "../services/api";
// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user'], // Specify which reducers to persist
};

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
 
  [userService.reducerPath]: userService.reducer, // Add user service reducer
  
  user: userReducer, // Add auth slice reducer
 
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      
      userService.middleware,

    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor }; // Export persistor for use in PersistGate

export default store;
