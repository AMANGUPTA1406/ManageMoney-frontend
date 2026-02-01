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

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}


export interface PaymentHistory {
    id: number;
    category_id: number;
    amount: number;
    notes: string;
    updated_at: string;
    created_at: string;
}

/**
 * Add payment history
 * @param categoryId - ID of the category
 * @param amount - Amount in rupees
 * @param notes - Optional notes for the transaction
 */
export const addPaymentHistory = async (
    categoryId: number,
    amount: number,
    notes?: string
): Promise<ApiResponse<PaymentHistory>> => {
    try {
        const response = await apiClient.post<ApiResponse<PaymentHistory>>('/api/v1/add-payment-history', {
            category_id: categoryId,
            amount: amount,
            notes: notes || '',
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as ApiResponse<PaymentHistory>;
        }
        throw error;
    }
};
