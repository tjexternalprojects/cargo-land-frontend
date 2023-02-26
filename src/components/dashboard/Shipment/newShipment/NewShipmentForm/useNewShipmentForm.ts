import React, { useState } from 'react';
// import { Country, State, City } from 'country-state-city';

function useNewShipmentForm(setAnimateTab: (value: string) => void) {
	const [countryCode, setCountryCode] = useState('NG');
	const [stateCode, setStateCode] = useState('');

	const handleSubmitNewShipmentForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAnimateTab('item2');
	};

	return { countryCode, stateCode, handleSubmitNewShipmentForm, setCountryCode, setStateCode };
}
export default useNewShipmentForm;
