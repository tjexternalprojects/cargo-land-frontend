import { useState } from 'react';

function useResetPassword() {
	const [showLoading, setShowLoading] = useState(false);
	const [resetPassword, setResetPassword] = useState({
		new_password: '',
		confirm_password: '',
		token: '',
	});
	const handleRestPassword = () => {};
	return { handleRestPassword, setResetPassword, showLoading, resetPassword };
}
export default useResetPassword;
