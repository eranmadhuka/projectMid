// components/PrivateRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './Common/Layout/DashboardLayout';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    // Step 2: Check authentication
    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Step 3: Check role authorization
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/login" replace />;
    }

    // Step 4: Render authorized content
    return <DashboardLayout>{children}</DashboardLayout>;
};

export default PrivateRoute;