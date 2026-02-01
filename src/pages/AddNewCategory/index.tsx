import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/categoryService';
import './AddNewCategory.css';

// ... (existing comments)

const AddNewCategory = () => {
    const navigate = useNavigate();

    // Form state
    const [categoryName, setCategoryName] = useState('');

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCategoryName(e.target.value);
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const trimmedName = categoryName.trim();
        if (!trimmedName) {
            setError('Please enter a category name');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await createCategory(trimmedName);

            if (response.success) {
                setSuccessMessage(response.message);
                setCategoryName('');
                // Optional: Navigate back after success
                // setTimeout(() => navigate(-1), 1500);
            } else {
                setError(response.message || 'Failed to create category');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle back navigation
     */
    const handleBack = () => {
        navigate(-1);
    };

    /**
     * Check if form is valid for submission
     */
    const isFormValid = categoryName.trim().length > 0;

    return (
        <div className="add-category-page">
            {/* Header */}
            <header className="add-category-header">
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
                <h1 className="header-title">New Category</h1>
            </header>

            {/* Content */}
            <form className="add-category-content" onSubmit={handleSubmit}>
                {/* Category Name Input */}
                <div className="input-group">
                    <textarea
                        className="category-input"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={handleInputChange}
                        maxLength={50}
                        rows={3}
                    />
                </div>

                {/* Color Picker Section - Commented for future use */}
                {/* 
        <div className="color-picker-section">
          <span className="color-picker-label">Pick a Color Label</span>
          <div className="color-picker-container">
            <button type="button" className="color-nav-button" aria-label="Previous colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="color-options">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Select ${color.id} color`}
                />
              ))}
            </div>
            <button type="button" className="color-nav-button" aria-label="Next colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
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
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default AddNewCategory;