// Application constants barrel export
// Add your constants here

/**
 * API configuration constants
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme',
} as const;

/**
 * Route paths for navigation
 */
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    TRANSACTIONS: '/transactions',
    SETTINGS: '/settings',
} as const;
