import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';

function useNewShipmentForm(setAnimateTab: (value: string) => void) {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [countryCode, setCountryCode] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [citySelected, setCitySelected] = useState('');
	const [address, setAddress] = useState('');
	const [mapAddress, setMapAddress] = useState('');
	const [shipmentDetails, setShipmentDetails] = useState<Record<string, string>>({});

	const handleSubmitNewShipmentForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

setState((prevState) => ({
			...prevState,
					shipmentDetails,
		}));
		// console.log(state.shipmentDetails);
		console.log(shipmentDetails);
		setAnimateTab('item2');
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
		shipmentDetails,
		state,
		setState,
		setShipmentDetails,
		setCitySelected,
		setAddress,
		handleSubmitNewShipmentForm,
		setCountryCode,
		setStateCode,
	};
}
export default useNewShipmentForm;
