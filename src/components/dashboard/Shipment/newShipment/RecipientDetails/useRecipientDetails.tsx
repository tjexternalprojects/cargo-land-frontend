import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import axios from '@/context/baseURL';
// import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';


function useRecipientDetails() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [countryCode, setCountryCode] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [citySelected, setCitySelected] = useState('');
	const [address, setAddress] = useState('');
	const [mapAddress, setMapAddress] = useState('');
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [formattedAddress, setFormattedAddress] = useState('');
	const { fetchLocation } = useGeocode();
	const [showLoading, setShowLoading] = useState(false);


	interface ShipmentDetails {
		recipient_full_name: string;
		recipient_email: string;
		shipment_destination: Record<string, string | number>;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({
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

	const handleRecipientDetails = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowLoading(true);

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
			setShowLoading(false);
			toast.info('Please fill the important fields (*)', {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});
			return;
		}

		setLatitude(null);
		setLongitude(null);
		await updateMapAddress();
		fetchLocation(mapAddress).then((data) => {
			setShowLoading(false);

			if (data.results.length > 1) {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}
			const { lat, lng } = data.results[0].geometry.location;

			setLatitude(lat);
			setLongitude(lng);
			setFormattedAddress(data.results[0].formatted_address);
			setShipmentDetails({
				...shipmentDetails,
				shipment_destination: {
					...shipmentDetails.shipment_destination,
					country: Country.getCountryByCode(countryCode)?.name as string,
					state: State.getStateByCodeAndCountry(stateCode, countryCode)?.name as string,
					city: citySelected,
					address: address,
					formattedAddress: formattedAddress,
					longitude: longitude as unknown as number,
					latitude: latitude as unknown as number,
				},
			});
		});
	};

	// This is use to control the active tab design
	const moveNext = async() => {
		setShowLoading(true);
		console.log(state.shipmentDetails);
		console.log(state.user.loggedIn)
		await axios
			.post('/shipment/create-shipment', state.shipmentDetails, {
				headers: {
					'Authorization': `Bearer ${state.user.loggedIn}`,
				},
			})
			.then((response) => {
				setShowLoading(false);
				console.log(response);
				setState({
					...state,
					shipmentCurrentTab: 'item3',
					form_level: 2,
				});
			})
			.catch((error) => {
				setShowLoading(false);
				console.log(error);
			});
			console.log('why')
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
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
	}, [shipmentDetails]);

	useEffect(() => {
		updateMapAddress();
	}, [address, citySelected, stateCode, countryCode]);


	const handleSubmit = ()=>{
	console.log(state.shipmentDetails)
		 axios
			.post('https://server.cargolandglobal.com/shipment/create-shipment',state.shipmentDetails,{
				headers: {
					'Authorization': `Bearer ${state.user.loggedIn}`,
				},
			})
			.then((response) => {
				setShowLoading(false);
				console.log(response);
			
			})
			.catch((error) => {
				setShowLoading(false);
				console.log(error);
			});
	}
	return {
		countryCode,
		stateCode,
		address,
		citySelected,
		mapAddress,
		shipmentDetails,
		longitude,
		latitude,
		formattedAddress,
		showLoading,
		handleSubmit,
		moveNext,
		setShipmentDetails,
		setCitySelected,
		setAddress,
		handleRecipientDetails,
		setCountryCode,
		setStateCode,
	};
}
export default useRecipientDetails;
