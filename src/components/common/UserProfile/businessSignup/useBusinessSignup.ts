import { AppContextType, AppContext } from '@/context';
import { useContext, useState } from 'react';

function useBusinessSignup() {
	const [showPassword, setShowPassword] = useState(false);
	const [activeTab, setActiveTab] = useState('business_data');
	const { state, setState } = useContext<AppContextType>(AppContext);

	return {
		showPassword,
		activeTab,
		state,
		setShowPassword,
		setActiveTab,
	};
}
export default useBusinessSignup;
