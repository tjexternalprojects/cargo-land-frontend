import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';

function useRecipentDetails(setAnimateTab: (value: string) => void) {
	const [countryCode, setCountryCode] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [citySelected, setCitySelected] = useState('');
	const [address, setAddress] = useState('');
	const [mapAddress, setMapAddress] = useState('');

	const handleRecipientDetails = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAnimateTab('item3');
	};

	const updateMapAddress = () => {
		const c_address = address != '' ? address + ', ' : '';
		const c_city = citySelected != '' && citySelected !== '0' ? citySelected + ', ' : '';
		const c_state = State.getStateByCodeAndCountry(stateCode, countryCode)?.name
			? State.getStateByCodeAndCountry(stateCode, countryCode)?.name + ', '
			: '';
		const c_country = Country.getCountryByCode(countryCode)?.name
			? Country.getCountryByCode(countryCode)?.name
			: '';

		setMapAddress(c_address + c_city + c_state + c_country);
	};
	useEffect(() => {
		updateMapAddress();
	}, [address, citySelected, stateCode, countryCode]);

	return {
		countryCode,
		stateCode,
		address,
		citySelected,
		mapAddress,
		setCitySelected,
		setAddress,
		handleRecipientDetails,
		setCountryCode,
		setStateCode,
	};
}
export default useRecipentDetails;
