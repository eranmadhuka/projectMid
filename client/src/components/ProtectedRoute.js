// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Your auth context

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Redirect to login if there's no user
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;