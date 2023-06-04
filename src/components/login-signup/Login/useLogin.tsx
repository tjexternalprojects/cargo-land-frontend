import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthServices, LocalStorageServices } from '@/services';
const GOOGLE_LOGIN_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
function useLogin() {
	const { login } = AuthServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [showLoading, setShowLoading] = useState(false);
	const [verifyEmail, setVerifiyEmail] = useState(false);

	const showForgotPassword = () => {
		setState({
			...state,
			showForgetPassword: true,
		});
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setVerifiyEmail(false);
		setShowLoading(true);

		login(loginData).then(
			(response) => {
				setShowLoading(false);
				if (response.status == 200) {
					const user_info = { ...response.data.user_info, id: response.data.id };
					LocalStorageServices.setLocalAccessToken(response.data.AccessToken);
					LocalStorageServices.setLocalRefreshToken(response.data.refreshToken);
					LocalStorageServices.setUserInfo(user_info);
					setState({
						...state,
						updateUser: !state.updateUser,
					});
					if (response.data.user_info.role <= 2) {
						navigate('/dashboard');
					} else if (response.data.user_info.role >= 3) {
						navigate('/admin');
					}

					toast.success(response.data.message, {
						progressClassName: 'bg-green-500 h-1',
						autoClose: 3000,
					});
				}
			},
			(error) => {
				setShowLoading(false);
				if (error.code == 'ERR_NETWORK') {
					toast.error(error.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				} else if (error.response.status == 401) {
					if (error.response.data.message === 'Please verify your email') {
						setVerifiyEmail(true);
					}
					toast.error(error.response.data.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				}
			}
		);
	};

	const handleVerifyEmail = () => {
		setState({
			...state,
			showResendToken: true,
		});
	};

	const googleLoginSuccess = (credentialResponse: Record<string, string>) => {
		const user_info = {
			name: credentialResponse.name,
			email: credentialResponse.email,
			avatar: credentialResponse.picture,
		};
		console.log(credentialResponse);
		LocalStorageServices.setUserInfo(user_info);
		LocalStorageServices.setLocalAccessToken(credentialResponse.jti);
		navigate('/dashboard');
	};

	const googleLoginFailure = () => {
		toast.error('An error occured', {
			progressClassName: 'bg-red-500 h-1',
			autoClose: 3000,
		});
	};

	const continueWithGoogle = () => {
		window.open(import.meta.env.VITE_REACT_APP_BASE_URL + 'auth/google/callback','_self');
	};
	return {
		handleVerifyEmail,
		showForgotPassword,
		setLoginData,
		handleLogin,
		googleLoginSuccess,
		googleLoginFailure,
		continueWithGoogle,
		loginData,
		showLoading,
		GOOGLE_LOGIN_CLIENT_ID,
		verifyEmail,
	};
}

export default useLogin;
