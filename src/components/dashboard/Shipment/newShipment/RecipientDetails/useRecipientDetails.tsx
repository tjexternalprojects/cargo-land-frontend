import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';
import Geocode from 'react-geocode';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

function useRecipientDetails() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [countryCode, setCountryCode] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [citySelected, setCitySelected] = useState('');
	const [address, setAddress] = useState('');
	const [mapAddress, setMapAddress] = useState('');
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	Geocode.setApiKey(GOOGLE_API_KEY);

	const getLocationOnMap = () => {
		Geocode.fromAddress(address).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;
				setLatitude(lat);
				setLongitude(lng);
			},
			(error) => {
				console.error(error);
			}
		);
	};

	useEffect(() => {
		if (address != '') {
			getLocationOnMap();
		}
	}, [address]);

	interface ShipmentDetails {
		shipment_id: string;
		recipient_full_name: string;
		recipient_email: string;
		shipment_destination: Record<string, string | number>;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({
		shipment_id: '',
		recipient_full_name: '',
		recipient_email: '',
		shipment_destination: {
			country: '',
			state: '',
			city: '',
			address: '',
			longitude: 0,
			latitude: 0,
		},
	});

	const handleRecipientDetails = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			shipmentDetails.recipient_full_name == '' ||
			shipmentDetails.recipient_email == '' ||
			countryCode == '' ||
			countryCode == '0' ||
			stateCode == '' ||
			stateCode == '0' ||
			citySelected == '' ||
			citySelected == '0' ||
			address == ''
		) {
			toast.info('Please fill the important fields (*)', {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});
			return;
		}
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, shipment_id: uuidv4(), form_level: 2 },
		}));

		setState({
			...state,
			shipmentCurrentTab: 'item3',
		});
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

		setShipmentDetails({
			...shipmentDetails,
			shipment_destination: {
				...shipmentDetails.shipment_destination,
				country: Country.getCountryByCode(countryCode)?.name as string,
				state: State.getStateByCodeAndCountry(stateCode, countryCode)?.name as string,
				city: citySelected,
				address: address,
				longitude: longitude as unknown as number,
				latitude: latitude as unknown as number,
			},
		});

		setMapAddress(c_address + c_city + c_state + c_country);
	};

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
	}, [shipmentDetails]);

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
		setShipmentDetails,
		setCitySelected,
		setAddress,
		handleRecipientDetails,
		setCountryCode,
		setStateCode,
	};
}
export default useRecipientDetails;
