import { useState, useEffect, useContext } from 'react';
const GOOGLE_SIGNUP_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
import { AuthServices } from '@/services';
import { toast } from 'react-toastify';
import { AppContextType, AppContext } from '@/context';
import { useNavigate } from 'react-router-dom';
import {TokenServices} from '@/services'

function useSignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();

	const [signUpData, setSignUpData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSingupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowLoading(true);

		AuthServices.signup(signUpData)
			.then((response) => {
				setShowLoading(false);
				if (response.status === 201) {

					toast.success('Profile Created Successfully', {
						progressClassName: 'bg-green-500 h-1',
						autoClose: 3000,
					});
					setState({
						...state,
						showResendToken: true,
						resendTokenMessage:'Profile created successfully, please check your email to verify your account'
					});
				} else {
					toast.error('Oops! an Error occured, please retry', {
						progressClassName: 'bg-red-500 h-1',
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

	const googleSignUpSuccess = (credentialResponse:Record<string,string>) => {

	
		const user_info = {
			name:credentialResponse.name,
			email:credentialResponse.email,
			avatar:credentialResponse.picture
		}

		TokenServices.setUserInfo(user_info)
		TokenServices.updateLocalAccessToken(credentialResponse.jti)
		navigate('/dashboard');

	
		
	};

	const googleSignUpFailure = () => {
		toast.error("An error occured", {
			progressClassName: 'bg-red-500 h-1',
			autoClose: 3000,
		});
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
