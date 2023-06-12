import api from './api.services';
import { LocalStorageServices } from '.';
import { useNavigate } from 'react-router-dom';

function AuthServices() {
	const navigate = useNavigate();

	const login = (loginData: Record<string, string>) => {
		return api.post('/user/login', loginData);
	};

	const signup = (signUpData: Record<string, string>) => {
		return api.post('/user/register', signUpData);
	};

	const resendVerification = (email: string) => {
		return api.patch('/user/resend-verification', { email });
	};

	const forgotPassword = (email: string) => {
		return api.post('/user/forgot-password', { email });
	};

	const resetPassword = (payload: Record<string, string | undefined>, token: string) => {
		return api.patch('/user/reset-password/' + token, payload);
	};

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return {
		login,
		signup,
		logout,
		resendVerification,
		forgotPassword,
		resetPassword,
	};
}
export default AuthServices;
