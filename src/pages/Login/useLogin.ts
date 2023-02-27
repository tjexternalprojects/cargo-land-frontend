import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useNavigate } from 'react-router-dom';

function useLogin() {
	const [toggleLoginType, setToggleLoginType] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();

	const handleSingupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleToggleBtn = (val: boolean) => {
		setToggleLoginType(val);
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setState((prevState) => ({
			...prevState,
			user: { loggedIn: true },
		}));
		navigate('/');
	};

	const handleLogout = () => {
		setState((prevState) => ({
			...prevState,
			user: { loggdIn: false },
		}));
		navigate('/login');
	};

	return {
		toggleLoginType,
		showPassword,
		setToggleLoginType,
		handleToggleBtn,
		setShowPassword,
		handleSingupSubmit,
		handleLogin,
		handleLogout,
	};
}

export default useLogin;
