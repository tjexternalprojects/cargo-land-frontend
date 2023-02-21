import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Login } from './pages';
import { useApp } from './context/IndexContext';

const useAuth = () => {
	const { user } = useApp();
	return user && user.loggedIn;
};
const ProtectedRoutes = () => {
	const isAuth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth]);

	if (isAuth) {
		return <Outlet />;
	} else {
		return <Login />;
	}
};

export default ProtectedRoutes;
