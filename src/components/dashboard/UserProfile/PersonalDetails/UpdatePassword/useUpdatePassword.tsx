import { UserServices } from '@/services';
import { useState } from 'react';
import { toast } from 'react-toastify';

function useUpdatePassword() {
	const [showLoader, setShowLoader] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
	});
	const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowLoader(true);
		UserServices.updateUser(passwordData).then(
			(response) => {
				console.log(response, 'goooddddddd');
				setShowLoader(false);
				setPasswordData({
					currentPassword: '',
					newPassword: '',
				});
				toast.success(response.data.message, {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
			},
			(error) => {
				console.log(error);
				setShowLoader(false);
				toast.success(error.response.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};
	return {
		showPassword,
		passwordData,
		showCurrentPassword,
		showLoader,
		setShowCurrentPassword,
		setPasswordData,
		handleChangePassword,
		setShowPassword,
	};
}

export default useUpdatePassword;
