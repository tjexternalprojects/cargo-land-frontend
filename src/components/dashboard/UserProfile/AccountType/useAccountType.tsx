import { useState } from 'react';

function useAccountType() {
	const [showBusinessForm, setShowBusinessForm] = useState(true);
	const handChangeAccountType = () => {
		setShowBusinessForm(false);
	};
	return { handChangeAccountType, showBusinessForm };
}
export default useAccountType;
