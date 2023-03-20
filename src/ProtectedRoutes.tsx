import { useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Login } from './pages';
import { useApp } from './context';

const useAuth = () => {
	const { user } = useApp();
	return user && user.loggedIn;
};

const unprotectedRoutes = ['/login', '/forgot_password']; // add more unprotected routes here

const ProtectedRoutes = () => {
	const isAuth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handleNavigate = useCallback(() => {
		const isUnprotectedRoute = unprotectedRoutes.includes(location.pathname);

		if (isAuth && !isUnprotectedRoute) {
			navigate(location.pathname);
		} else if (!isAuth && !isUnprotectedRoute) {
			navigate('/login', { state: { from: location.pathname } });
		}
	}, [isAuth, location, navigate, unprotectedRoutes]);

	useEffect(() => {
		handleNavigate();
	}, []);

	if (isAuth === null) {
		return <Outlet />;
	} else if (!isAuth) {
		throw new Error('Access denied');
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoutes;
