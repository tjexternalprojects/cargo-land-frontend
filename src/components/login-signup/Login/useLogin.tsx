import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useNavigate } from 'react-router-dom';
import axios from '@/context/baseURL';
import { toast } from 'react-toastify';
const GOOGLE_SIGNUP_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
function useLogin() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [showLoading, setShowLoading] = useState(false);

	const googleSignUpSuccess = (response: any) => {
		console.log('Successfully signed up with Google!', response);
		// Send the user's info to your backend for authentication and account creation
	};

	const googleSignUpFailure = (response: any) => {
		console.log('Failed to sign up with Google.', response);
	};

	const showForgotPassword = () =>{
		setState({
			...state,
			showForgetPassword: true,
		});
	}

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setShowLoading(true);

		axios
			.post('/user/login', loginData)
			.then((response) => {
				setShowLoading(false);
				if (response.status == 200) {
					localStorage.setItem('login_token', response.data.token);
					localStorage.setItem('user_info', JSON.stringify(response.data.user_info));
					setState((prevState) => ({
						...prevState,
						user: { loggedIn: response.data.token, user_info: response.data.user_info },
					}));
					navigate('/');

					toast.success(response.data.message, {
						progressClassName: 'bg-green-500 h-1',
						autoClose: 3000,
					});
				}
			})
			.catch((error) => {
				setShowLoading(false);
				console.log(error);
				if (error.response.status == 401) {
					toast.error(error.response.data.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				}
			});
	};

	return {
		loginData,
		showLoading,
		GOOGLE_SIGNUP_CLIENT_ID,
		showForgotPassword,
		googleSignUpSuccess,
		googleSignUpFailure,
		setLoginData,
		handleLogin,
	};
}

export default useLogin;
