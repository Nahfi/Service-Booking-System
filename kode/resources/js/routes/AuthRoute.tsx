import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import type { RootState } from '../redux/store/store';
import { getToken } from '../utils/helper';

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const AuthRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);
    const token = getToken();
    const isAuthenticated = token && user;

    return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default AuthRoute