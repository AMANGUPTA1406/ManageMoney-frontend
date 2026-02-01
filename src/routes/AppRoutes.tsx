import { Routes, Route } from 'react-router-dom';
// import { ProtectedRoute } from './ProtectedRoute';
import AddNewCategory from '../pages/AddNewCategory';
import AddPaymentHistory from '../pages/AddPaymentHistory';

/**
 * Main application routes configuration
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<div>Home Page - Replace with actual component</div>} />

      {/* Category Routes */}
      <Route path="/category/new" element={<AddNewCategory />} />

      {/* Payment History Routes */}
      <Route path="/payment/new" element={<AddPaymentHistory />} />

      {/* Protected Routes - Wrap with ProtectedRoute when needed */}
      {/* 
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      /> 
      */}

      {/* 404 Not Found */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
