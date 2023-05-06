import { useState } from 'react';

function useBusinessSignup() {
	const [showPassword, setShowPassword] = useState(false);
	const [activeTab, setActiveTab] = useState('business_data');

	return {
		showPassword,
		setShowPassword,
		activeTab,
		setActiveTab,
	};
}
export default useBusinessSignup;
