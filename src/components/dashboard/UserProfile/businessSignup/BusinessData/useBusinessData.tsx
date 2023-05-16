import { AppContextType, AppContext } from '@/context';
import { useContext, useState } from 'react';

function useBusinessData(setActiveTab: (tab: string) => void) {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const [businessData, setBusinessData] = useState({
		business_name: '',
		business_number: '',
		business_email: '',
		phone_number: '',
		office_address: '',
	});
	const handleSubmitBusinessData = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState({
			...state,
			business_account: businessData,
		});
		setActiveTab('business_document');
	};
	return { handleSubmitBusinessData, setBusinessData, businessData };
}

export default useBusinessData;
