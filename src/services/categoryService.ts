import axios from 'axios';

/**
 * API Configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

/**
 * Axios instance with default configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * API Response Interfaces
 */
export interface Category {
    id: number;
    category: string;
    is_active: number;
    updated_at: string;
    created_at: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

/**
 * Create a new category
 * @param categoryName - Name of the category to create
 */
export const createCategory = async (categoryName: string): Promise<ApiResponse<Category>> => {
    try {
        const response = await apiClient.post<ApiResponse<Category>>('/api/v1/create-category', {
            category: categoryName,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as ApiResponse<Category>;
        }
        throw error;
    }
};

/**
 * Get all categories
 */
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
    try {
        const response = await apiClient.get<ApiResponse<Category[]>>('/api/v1/get-categories');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as ApiResponse<Category[]>;
        }
        throw error;
    }
};