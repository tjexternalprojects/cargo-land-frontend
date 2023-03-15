import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useNavigate } from 'react-router-dom';
import axios from '@/context/axios';
function useLogin() {
	const [toggleLoginType, setToggleLoginType] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ email: '', password: '' });

	const handleSingupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleToggleBtn = (val: boolean) => {
		setToggleLoginType(val);
	};

	const handleLogout = () => {
		localStorage.removeItem('login_token');
		setState({
			...state,
			user: { loggdIn: false },
		});
		navigate('/login');
	};

	return {
		toggleLoginType,
		showPassword,
		setLoginData,
		setToggleLoginType,
		handleToggleBtn,
		setShowPassword,
		handleSingupSubmit,
		handleLogout,
	};
}

export default useLogin;
