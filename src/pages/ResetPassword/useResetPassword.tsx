import { useState } from 'react';
import { AuthServices } from '@/services';
import { useParams } from 'react-router-dom';

function useResetPassword() {
	const { token } = useParams();
	const { resetPassword } = AuthServices();
	const [errorMessage, setErrorMessage] = useState('');
	const [showLoading, setShowLoading] = useState(false);
	const [resetPasswordObj, setResetPassword] = useState({
		new_password: '',
		confirm_password: '',
		token: token,
	});
	const handleRestPassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (resetPasswordObj.new_password !== resetPasswordObj.confirm_password) {
			setErrorMessage('password does not match');
			return;
		}
		setShowLoading(true);
		resetPassword(resetPasswordObj).then(
			(response) => {
				console.log(response)
				setShowLoading(false);
			},
			(error) => {
				console.log(error, 'error')
				setShowLoading(false);
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
