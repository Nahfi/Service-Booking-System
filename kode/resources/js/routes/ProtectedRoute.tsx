import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import type { RootState } from '../redux/store/store';
import { getToken } from '../utils/helper';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = getToken();
    const user = useSelector((state: RootState) => state.user);
    const isAuthenticated = token && user;

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/login"
            replace
            state={{ from: window.location.pathname }}
        />
    );
};

export default ProtectedRoute