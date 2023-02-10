import { useState } from 'react';
function useLogin() {
	const [toggleLoginType, setToggleLoginType] = useState(false);
	const handleToggleBtn = (val: boolean) => {
		setToggleLoginType(val);
	};
	return { toggleLoginType, setToggleLoginType, handleToggleBtn };
}

export default useLogin;
