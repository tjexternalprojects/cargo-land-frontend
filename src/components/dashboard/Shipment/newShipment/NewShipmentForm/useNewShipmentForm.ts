import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useNewShipmentForm(setAnimateTab: (value: string) => void) {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [countryCode, setCountryCode] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [citySelected, setCitySelected] = useState('');
	const [address, setAddress] = useState('');
	const [mapAddress, setMapAddress] = useState('');
	const [shipmentDetails, setShipmentDetails] = useState<
		Record<string, string | number | (string | ArrayBuffer | null)[]>
	>({
		shipment_title: '',
		shipment_description: '',
		shipment_weight: 0,
		images: [] as (string | null)[],
	});

	 const image_slider_settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 1,
		};

	const handleSubmitNewShipmentForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
		console.log(state.shipmentDetails);
		setAnimateTab('item2');
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();

				reader.onloadend = () => {
					const dataUrl = reader.result;
					setShipmentDetails((prevDetails) => ({
						...prevDetails,
						images: [...(prevDetails.images as (string | null)[]), dataUrl],
					}));
				};

				reader.readAsDataURL(file);
			} else {
				toast.info('Please select an image file', {
					progressClassName: 'bg-blue-500 h-1',
					autoClose: 3000,
				});
				
			}
		}
		console.log(shipmentDetails);
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
		image_slider_settings,
		handleImageChange,
		setShipmentDetails,
		setCitySelected,
		setAddress,
		handleSubmitNewShipmentForm,
		setCountryCode,
		setStateCode,
	};
}
export default useNewShipmentForm;
