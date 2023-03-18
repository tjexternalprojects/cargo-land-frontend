import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function useLogin() {
	const [toggleLoginType, setToggleLoginType] = useState(false);
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ email: '', password: '' });

	const handleToggleBtn = (val: boolean) => {
		setToggleLoginType(val);
	};

	const handleLogout = () => {
		confirmAlert({
			title: 'Logout?',
			message: 'Are you sure you want to logout',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						localStorage.clear();
						setState({
							...state,
							user: { loggedIn: null },
						});
						navigate('/login');
						toast.success('Logged out successfully', {
							progressClassName: 'bg-green-500 h-1',
							autoClose: 3000,
						});
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	return {
		toggleLoginType,
		setLoginData,
		setToggleLoginType,
		handleToggleBtn,
		handleLogout,
	};
}

export default useLogin;
