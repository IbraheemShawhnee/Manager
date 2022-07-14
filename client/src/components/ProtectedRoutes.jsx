import { useContext } from "react";
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { UserContext } from "../App"

export const AuthRoutes = () => {
    const useAuth = () => {
        const { user } = useContext(UserContext);
        return user;
    };
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace state={{ from: location }} />
      );
}

export const AdminRoutes = () => {
    const useAuth = () => {
        const { user } = useContext(UserContext);
        return user && (user.isAdmin || user.isSuper);
    };
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
}