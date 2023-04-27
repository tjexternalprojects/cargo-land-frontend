import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import {ShipmentServices} from '@/services'
import 'react-toastify/dist/ReactToastify.css';
function useRecipientDetails() {
	const {createShipment, getAllUserShipment} = ShipmentServices()
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


	const resetShipment = () =>{
		const shipmentDetails = {
			shipment_title: '',
			shipment_description: '',
			shipment_weight: 0,
			images: [],
			current_location: {
				country: '',
				state: '',
				city: '',
				address: '',
				formattedAddress: '',
				longitude: 0,
				latitude: 0,
			},
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
		};
		setState({
			...state,
			shipmentDetails,
		});
	}

	interface ShipmentDetails {
		recipient_full_name: string;
		recipient_email: string;
		shipment_destination: Record<string, string | number>;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({
		recipient_full_name: state.shipmentDetails.recipient_full_name as string,
		recipient_email: state.shipmentDetails.recipient_email as string,
		shipment_destination: {
			country: state.shipmentDetails.country as string,
			state: state.shipmentDetails.state as string,
			city: state.shipmentDetails.city as string,
			address: state.shipmentDetails.address as string,
			longitude: state.shipmentDetails.longitude as number,
			latitude: state.shipmentDetails.latitude as number,
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
					formattedAddress: data.results[0].formatted_address,
					longitude: lng,
					latitude: lat,
				},
			});
		});
	};

	// This is use to control the active tab design
	const moveNext = async () => {
		// console.log(state.shipmentDetails)
		setShowLoading(true);
		let shipment_images = state.shipmentDetails.images as [];
		const { images, ...newPayload } = state.shipmentDetails;
		const payload = JSON.stringify(newPayload);

		const formData = new FormData();
		formData.append('payload', payload);
		for (let i = 0; i < shipment_images.length ; i++) {
			formData.append('images', shipment_images[i]);
		}


		
		await createShipment
			(formData)
			.then((response) => {
				setShowLoading(false);
				setState({
					...state,
					shipmentCurrentTab: 'item3',
					form_level: 2,
				});
				getAllUserShipment()
				resetShipment()
			},
			(error) => {
				setShowLoading(false);
			})
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
