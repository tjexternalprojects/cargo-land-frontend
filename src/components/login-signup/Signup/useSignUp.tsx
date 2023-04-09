import { useState, useEffect } from 'react';
const GOOGLE_SIGNUP_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
import { AuthServices } from '@/services';
import { toast } from 'react-toastify';

function useSignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [signUpData, setSignUpData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSingupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowLoading(true);

		console.log(signUpData.confirmPassword);
		console.log(signUpData);
		AuthServices.signup(signUpData)
			.then((response) => {
				console.log(response);
				setShowLoading(false);
				if (response.status == 200) {
					toast.success(response.data.message, {
						progressClassName: 'bg-green-500 h-1',
						autoClose: 3000,
					});
				} else {
					toast.error(response.data.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				}
			},
			(error) => {
				setShowLoading(false);
				console.log(error.response.data);
				if (error.code == 'ERR_NETWORK') {
					toast.error(error.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				} else if (error.response.status == 401) {
					toast.error(error.response.data.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				} else {
					toast.error(error.response.data.Error, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				}
			});
	};

	const googleSignUpSuccess = (response: any) => {
		console.log('Successfully signed up with Google!', response);
	};

	const googleSignUpFailure = (response: any) => {
		console.log('Failed to sign up with Google.', response);
	};

	return {
		showPassword,
		GOOGLE_SIGNUP_CLIENT_ID,
		showLoading,
		signUpData,
		setSignUpData,
		setShowPassword,
		handleSingupSubmit,
		googleSignUpSuccess,
		googleSignUpFailure,
	};
}
export default useSignUp;
