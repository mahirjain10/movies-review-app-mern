import {useNavigate ,Route, Routes, Navigate} from 'react-router-dom'

export const ProtectedRoute = ({ children ,isAuthenticated}) => {
    if (!isAuthenticated) {
      // user is not authenticated
      return <Navigate to="/auth/sign-up" />;
    }
    return children;
  };

export default ProtectedRoute