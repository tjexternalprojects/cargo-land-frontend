import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useNavigate } from 'react-router-dom';
import axios from '@/context/axios';
import { toast } from 'react-toastify';

function useLogin() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [showLoading, setShowLoading] = useState(false);
	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setShowLoading(true);
		axios
			.post('/user/login', loginData)
			.then((response) => {
				console.log(response.data);
				setShowLoading(false);
				if (response.status == 200) {
					localStorage.setItem('login_token', response.data.token);
					//   setState((prevState) => ({
					//     ...prevState,
					//     user: { loggedIn: true },
					//   }));
					navigate('/');

					toast.success(response.data.message, {
						progressClassName: 'bg-green-500 h-1',
						autoClose: 3000,
					});
				}
			})
			.catch((error) => {
				setShowLoading(false);
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
		setLoginData,
		handleLogin,
	};
}

export default useLogin;
