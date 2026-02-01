import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
// import authReducer from './slices/authSlice';
// import userReducer from './slices/userSlice';

/**
 * Redux store configuration
 * Add your reducers to the reducer object as you create them
 */
export const store = configureStore({
    reducer: {
        // Add your reducers here
        // auth: authReducer,
        // user: userReducer,
    },
    // Enable Redux DevTools in development
    devTools: import.meta.env.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export hooks for convenience
export { useAppDispatch, useAppSelector } from './hooks';
