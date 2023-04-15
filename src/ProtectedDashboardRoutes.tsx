import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const useAuth = () => {
  const user_info = localStorage.getItem('user_info');
	const user = {
		user_info:user_info? JSON.parse(user_info):null,
		loggedIn: localStorage.getItem('access_token'),
	};
	return user;
};

const ProtectedRoutes = () => {
	const isAuth = useAuth();
	const navigate = useNavigate();


	if (isAuth.user_info.role <= 2 && window.location.pathname === '/login') {
		navigate(-1);
		return null;
	}

	return isAuth.user_info.role <= 2 ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
