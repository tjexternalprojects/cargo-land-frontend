import React, { useState } from 'react';
function useLogin() {
	const [toggleLoginType, setToggleLoginType] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleSingupSubmit=(e: React.FormEvent<HTMLFormElement>) =>{
		e.preventDefault();
	}
	const handleToggleBtn = (val: boolean) => {
		setToggleLoginType(val);
	};
	return { toggleLoginType, setToggleLoginType, handleToggleBtn, showPassword, setShowPassword, handleSingupSubmit };
}

export default useLogin;
