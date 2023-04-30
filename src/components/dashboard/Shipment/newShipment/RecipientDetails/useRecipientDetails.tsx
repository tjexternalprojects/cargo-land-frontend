import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import { ShipmentServices } from '@/services';
function useNewShipmentForm() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showLoader, setShowLoader] = useState(false);
	const { fetchLocation } = useGeocode();
	const {createShipment, getAllUserShipment, getCountryCovered} = ShipmentServices()
	
	// Current address
	const [country, setCountry] = useState<Record<string, string>>({});
	const [countryState, setCountryState] = useState<Record<string, string>>({});
	const [stateCity, setStateCity] = useState<Record<string, string>>({})
	const [address, setAddress] = useState<string>("")
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
				country: state.shipmentDetails.current_location.country as string,
				state: state.shipmentDetails.current_location.state as string,
				city: state.shipmentDetails.current_location.city as string,
				address: state.shipmentDetails.current_location.address as string,
				formattedAddress: state.shipmentDetails.current_location.formattedAddress as string,
				longitude: state.shipmentDetails.current_location.longitude as number,
				latitude: state.shipmentDetails.current_location.latitude as number,
			},
		});
		
	};


	const handleSetCountry = (country: Record<string, string>) => {
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
		fetchLocation(address + ', '+ stateCity.name+', '+ countryState.name +', '+ country.name).then((data) => {
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
					country: country.name,
					state: countryState.name,
					city: stateCity.name,
					address: address + ', '+ stateCity.name+', '+ countryState.name +', '+ country.name,
					formattedAddress: data.results[0].formatted_address,
					longitude: lng,
					latitude: lat,
				},
			});
		});
	};


	const resetShipment = () =>{
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

		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, resetShipmentDetails },
		}));
	}

	const moveNext = async () => {
		// console.log(state.shipmentDetails)
		setShowLoader(true);
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
				console.log(response)
				setShowLoader(false);
				setState({
					...state,
					shipmentCurrentTab: 'item3',
					form_level: 2,
				});
			console.log(state.shipmentCurrentTab, state.form_level)

				getAllUserShipment()
				resetShipment()
			},
			(error) => {
				setShowLoader(false);
			})

			console.log(state.shipmentCurrentTab, state.form_level)
	};



	const getCounteryCovered = () => {
		getCountryCovered().then(
			(response) => {
				setCountryCovered(Object.values(response.data));
			},
			(error) => {
				console.log(error);
				toast.error('Error getting countries', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	// RESET CURRENT LOCATION IF CURRENT LOCATION CHANGES
	useEffect(() => {
		if (shipmentDetails.shipment_destination?.formattedAddress !=="" && shipmentDetails.shipment_destination?.longitude !== null && shipmentDetails.shipment_destination?.latitude !== null){
		setShipmentDetails({
			...shipmentDetails,
			shipment_destination: {
				...shipmentDetails.shipment_destination,
				country: country.name,
				state: countryState.name,
				city: stateCity.name,
				address: address + ', '+ stateCity.name+', '+ countryState.name +', '+ country.name,
				formattedAddress: "",
				longitude: null,
				latitude: null,
			},
		});
		}
	}, [ country, countryState, stateCity, address]);

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
		// resetInputs();
	}, [state.editShipment]);

	return {
		handleRecipientDetails,
		setCountryState,
		setShipmentDetails,
		moveNext,
		setStateCity,
		setAddress,
		handleSetCountry,
		stateCity,
		address,
		countryState,
		showLoader,
		country,
		shipmentDetails,
	};
}
export default useNewShipmentForm;
