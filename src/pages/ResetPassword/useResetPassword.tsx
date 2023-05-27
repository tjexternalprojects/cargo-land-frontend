import { useState } from 'react';
import { AuthServices } from '@/services';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function useResetPassword() {
	const { token } = useParams();
	const { resetPassword } = AuthServices();
	const [errorMessage, setErrorMessage] = useState('');
	const [showLoading, setShowLoading] = useState(false);
	const navigate = useNavigate();
	const [resetPasswordObj, setResetPassword] = useState({
		password: '',
		confirmPassword: ''
	});
	const handleRestPassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (resetPasswordObj.password !== resetPasswordObj.confirmPassword) {
			setErrorMessage('password does not match');
			return;
		}
		setShowLoading(true);
		resetPassword(resetPasswordObj, token as string).then(
			(response) => {
				console.log(response)
				setShowLoading(false);
				toast.success(response.data.message, {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				navigate('/login')
			},
			(error) => {
				console.log(error, 'error')
				setShowLoading(false);
				toast.error(error.response?.data?.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};
	return {
		handleRestPassword,
		setResetPassword,
		setErrorMessage,
		errorMessage,
		showLoading,
		resetPasswordObj,
	};
}
export default useResetPassword;
