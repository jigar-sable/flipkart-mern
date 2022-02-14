import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/login" /> : isAdmin ? user.role !== "admin" ? <Navigate to="/login" /> : children : children
            )}
        </>
    );
};

export default ProtectedRoute;
