import { useState } from 'react';
function useLogin() {
	const [toggleLoginType, setToggleLoginType] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleToggleBtn = (val: boolean) => {
		setToggleLoginType(val);
	};
	return { toggleLoginType, setToggleLoginType, handleToggleBtn, showPassword, setShowPassword };
}

export default useLogin;
