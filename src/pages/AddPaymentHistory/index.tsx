import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, type Category } from '../../services/categoryService';
import { addPaymentHistory } from '../../services/paymentHistoryService';
import './AddPaymentHistory.css';

const AddPaymentHistory = () => {
    const navigate = useNavigate();
    const hasFetchedCategories = useRef(false);

    // Form state
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');
    const [amount, setAmount] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    // Categories state
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Fetch categories on page load (only once)
    useEffect(() => {
        if (hasFetchedCategories.current) return;
        hasFetchedCategories.current = true;

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.success && response.data) {
                    setCategories(response.data);
                } else {
                    setError(response.message || 'Failed to load categories');
                }
            } catch (err) {
                setError('Failed to load categories');
            } finally {
                setIsCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCategoryId(value ? parseInt(value, 10) : '');
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numbers and decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validation
        if (selectedCategoryId === '') {
            setError('Please select a category');
            return;
        }

        const amountValue = parseFloat(amount);
        if (!amount || isNaN(amountValue) || amountValue <= 0) {
            setError('Please enter a valid amount greater than 0');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await addPaymentHistory(
                selectedCategoryId as number,
                amountValue,
                notes.trim()
            );

            if (response.success) {
                setSuccessMessage(response.message);
                // Reset form
                setSelectedCategoryId('');
                setAmount('');
                setNotes('');
            } else {
                setError(response.message || 'Failed to add transaction');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const isFormValid = selectedCategoryId !== '' && amount !== '' && parseFloat(amount) > 0;

    return (
        <div className="add-payment-page">
            {/* Header */}
            <header className="add-payment-header">
                <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <h1 className="header-title">Add Transaction</h1>
            </header>

            {/* Content */}
            <form className="add-payment-content" onSubmit={handleSubmit}>
                {/* Category Select */}
                <div className="input-group">
                    <label className="input-label" htmlFor="category-select">
                        Select Category
                    </label>
                    {isCategoriesLoading ? (
                        <div className="loading-categories">Loading categories...</div>
                    ) : (
                        <select
                            id="category-select"
                            className="category-select"
                            value={selectedCategoryId}
                            onChange={handleCategoryChange}
                            disabled={categories.length === 0}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Amount Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="amount-input">
                        Amount
                    </label>
                    <div className="amount-input-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input
                            id="amount-input"
                            type="number"
                            className="amount-input"
                            placeholder="0.00"
                            value={amount}
                            onChange={handleAmountChange}
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                {/* Notes Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="notes-input">
                        Notes (Optional)
                    </label>
                    <textarea
                        id="notes-input"
                        className="notes-input"
                        placeholder="Add a note..."
                        value={notes}
                        onChange={handleNotesChange}
                        maxLength={200}
                        rows={3}
                    />
                </div>

                {/* Date Section - Commented for future use */}
                {/*
                <div className="input-group">
                    <label className="input-label">Date</label>
                    <div className="date-display">
                        <svg className="date-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="date-text">Today</span>
                    </div>
                </div>
                */}

                {/* Error Message */}
                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="success-message" role="status">
                        {successMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    disabled={!isFormValid || isLoading}
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddPaymentHistory;
