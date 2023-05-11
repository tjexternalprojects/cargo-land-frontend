import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
function useNewShipmentForm() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showLoader, setShowLoader] = useState(false);
	const { fetchLocation } = useGeocode();
	const { createShipment, updateShipment, getAllUserShipment, getCountryCovered } =
		ShipmentServices();

	// Current address
	const [country, setCountry] = useState<any>({});
	const [countryState, setCountryState] = useState<any>({});
	const [stateCity, setStateCity] = useState<any>({});
	const [address, setAddress] = useState<string>('');
	const [countryCovered, setCountryCovered] = useState<Record<string, string>[]>([]);

	// function to handle shipment data details
	interface ShipmentDetails {
		recipient_full_name?: string;
		recipient_email?: string;
		shipment_destination?: Record<string, string | number | null>;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({});

	const resetInputs = () => {
		setShipmentDetails({
			...shipmentDetails,
			recipient_full_name: state.shipmentDetails.recipient_full_name as string,
			recipient_email: state.shipmentDetails.recipient_email as string,
			shipment_destination: {
				country: state.shipmentDetails.shipment_destination.country,
				state: state.shipmentDetails.shipment_destination.state,
				city: state.shipmentDetails.shipment_destination.city,
				address: state.shipmentDetails.shipment_destination.address as string,
				formattedAddress: state.shipmentDetails.shipment_destination.formattedAddress as string,
				longitude: state.shipmentDetails.shipment_destination.longitude as number,
				latitude: state.shipmentDetails.shipment_destination.latitude as number,
			},
		});
		if (state.shipmentDetails.current_location.country !== '') {
			const getCountryDetails = Country.getCountryByCode(
				state.shipmentDetails.shipment_destination.country.isoCode
			);
			setCountry(getCountryDetails);
			setCountryState(state.shipmentDetails.shipment_destination.state);
			setStateCity(state.shipmentDetails.shipment_destination.city);
			setAddress(state.shipmentDetails.shipment_destination.address);
		} else {
			setCountry({});
		}
	};

	const resetShipmentStateOnChangeAddress = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item2',
			form_level: 1,
		});
		setShipmentDetails({
			...shipmentDetails,
			shipment_destination: {
				...shipmentDetails.shipment_destination,
				country: country,
				state: countryState,
				city: stateCity,
				address: address,
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
		});
	};

	const handleChangeCountry = (country: Record<string, string>) => {
		resetShipmentStateOnChangeAddress();
		if (country) {
			const selectedCountry = countryCovered.some(
				(obj: Record<string, string>) => obj.name === country.name
			);

			if (selectedCountry === false) {
				toast.info('Sorry our services dosnt cover ' + country.name + ' yet', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
				setCountry({});
			} else {
				setCountry(country);
			}
		} else {
			setCountry(country);
		}
	};

	const handleChangeState = (state: any) => {
		resetShipmentStateOnChangeAddress();
		setCountryState(state);
	};
	const handleChangeCity = (city: any) => {
		resetShipmentStateOnChangeAddress();
		setStateCity(city);
	};
	const handleChangeAddress = (address: any) => {
		resetShipmentStateOnChangeAddress();
		setAddress(address);
	};

	const handleRecipientDetails = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowLoader(true);
		if (
			shipmentDetails.recipient_full_name == '' ||
			shipmentDetails.recipient_email == '' ||
			Object.keys(country).length === 0
		) {
			setShowLoader(false);
			toast.info('Please fill the important fields (*)', {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});
			return;
		}

		// await updateMapAddress();
		fetchLocation(
			address + ', ' + stateCity.name + ', ' + countryState.name + ', ' + country.name
		).then((data) => {
			// console.log(data)
			setShowLoader(false);
			if (data.results.length > 1) {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}

			const { lat, lng } = data.results[0].geometry.location;

			setShipmentDetails({
				...shipmentDetails,
				shipment_destination: {
					...shipmentDetails.shipment_destination,
					country: country,
					state: countryState,
					city: stateCity,
					address: address,
					formattedAddress: data.results[0].formatted_address,
					longitude: lng,
					latitude: lat,
				},
			});
		});
	};

	const resetShipment = () => {
		const resetShipmentDetails = {
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
				longitude: null,
				latitude: null,
			},
			recipient_full_name: '',
			recipient_email: '',
			shipment_destination: {
				country: '',
				state: '',
				city: '',
				address: '',
				longitude: null,
				latitude: null,
			},
		};

		// setState({
		// 	...state,
		// 	shipmentDetails: resetShipmentDetails,
		// });

		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, resetShipmentDetails },
		}));
	};

	const handleUpdateShipment = (shipment_id: string) => {
		setShowLoader(true);
		let shipment_images = state.shipmentDetails.images as [];
		const { images, ...newPayload } = state.shipmentDetails;
		const payload = JSON.stringify(newPayload);
		const formData = new FormData();
		formData.append('payload', payload);
		for (let i = 0; i < shipment_images.length; i++) {
			formData.append('images', shipment_images[i]);
		}

		updateShipment(shipment_id, formData).then(
			(response) => {
				setShowLoader(false);
				toast.success('Shipment Updated Successfully', {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				resetShipment();
				getAllUserShipment();

				setState({
					...state,
					shipmentCurrentTab: 'item3',
					form_level: 2,
					editShipment: false,
				});
			},
			(error) => {
				setShowLoader(false);
				toast.error('Sorry an error occured! Please Try again', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};
	const moveNext = async () => {
		setShowLoader(true);
		let shipment_images = state.shipmentDetails.images as [];
		const { images, ...newPayload } = state.shipmentDetails;
		const payload = JSON.stringify(newPayload);

		const formData = new FormData();
		formData.append('payload', payload);
		for (let i = 0; i < shipment_images.length; i++) {
			formData.append('images', shipment_images[i]);
		}
		await createShipment(formData).then(
			(response) => {
				setShowLoader(false);
				setState({
					...state,
					shipmentCurrentTab: 'item3',
					form_level: 2,
				});
				getAllUserShipment();
				resetShipment();
			},
			(error) => {
				setShowLoader(false);
			}
		);
	};

	const getCounteryCovered = () => {
		getCountryCovered().then(
			(response) => {
				setCountryCovered(Object.values(response.data));
			},
			(error) => {
				toast.error('Error getting countries', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	// UPDATE THE GLOBAL STATE
	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
	}, [shipmentDetails]);

	// GET LIST OF COUNTRIES COVERED BY CARGOLAND
	useEffect(() => {
		getCounteryCovered();
	}, []);

	// RESET INPUTS TO PREVIOUS SHIPMENT WHICH ONE TO BE EDITED
	useEffect(() => {
		resetInputs();
	}, [state.editShipment]);

	return {
		handleRecipientDetails,
		setCountryState,
		setShipmentDetails,
		moveNext,
		setStateCity,
		setAddress,
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		handleUpdateShipment,
		state,
		stateCity,
		address,
		countryState,
		showLoader,
		country,
		shipmentDetails,
	};
}
export default useNewShipmentForm;
