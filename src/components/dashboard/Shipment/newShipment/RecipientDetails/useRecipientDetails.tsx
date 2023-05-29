import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import airportCodes from 'airport-codes';

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
	const [airportList, setAirportList] = useState<Record<string, string>[]>([]);
	const [airport, setAirport] = useState<any>({});
	const [countryCovered, setCountryCovered] = useState<Record<string, string>[]>([]);

	// function to handle shipment data details
	interface ShipmentDetails {
		recipient_full_name?: string;
		recipient_email?: string;
		recipient_phone_number?: string;
		final_destination?: Record<string, string | number | null>;
		shipment_heading_to?:string;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({});

	const generateID = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return (
			Array.from({ length: 3 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('') +
			Math.random().toString().substring(2, 6) +
			Date.now().toString().slice(-4)
		).substring(0, 9)
	}

	const resetInputs = () => {
		setShipmentDetails({
			...shipmentDetails,
			recipient_full_name: state.shipmentDetails?.recipient_full_name as string,
			recipient_email: state.shipmentDetails?.recipient_email as string,
			recipient_phone_number: state.shipmentDetails?.recipient_phone_number as string,
			shipment_heading_to:state.shipmentDetails?.shipment_heading_to as string,
			final_destination: {
				location_id:state.shipmentDetails?.final_destination?.location_id,
				country: state.shipmentDetails?.final_destination?.country,
				state: state.shipmentDetails?.final_destination?.state,
				city: state.shipmentDetails?.final_destination?.city,
				address: state.shipmentDetails?.final_destination?.address as string,
				formattedAddress: state.shipmentDetails?.final_destination?.formattedAddress as string,
				longitude: state.shipmentDetails?.final_destination?.longitude as number,
				latitude: state.shipmentDetails?.final_destination?.latitude as number,
			},
		});
		if (state.shipmentDetails?.start_location?.country !== '') {
			const getCountryDetails = Country.getCountryByCode(
				state.shipmentDetails?.final_destination?.country?.isoCode
			);
			setCountry(getCountryDetails);
			setCountryState(state.shipmentDetails?.final_destination?.state);
			setStateCity(state.shipmentDetails?.final_destination?.city);
			setAddress(state.shipmentDetails?.final_destination?.address);
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
			final_destination: {
				...shipmentDetails.final_destination,
				location_id: shipmentDetails?.final_destination?.location_id as string,
				country: country,
				state: countryState,
				city: stateCity,
				address: '',
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
		});
		setAddress('')

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

		const handleChangeAirport = (selected_airport: any) => {
			resetShipmentStateOnChangeAddress();
			setAirport(selected_airport);
			setAddress(selected_airport.name + ' Airport');
			setStateCity({ ...stateCity, name: selected_airport.city });
			setCountryState({ ...countryState, name: '' });
		};

	const handleChangeAddress = (address: any) => {
		resetShipmentStateOnChangeAddress();
		setAddress(address);
	};

		const fetchAirports = (country: string) => {
			const airportCodesJson = airportCodes.toJSON();
			const airports = airportCodesJson.filter((airport: any) => {
				return airport.country === country;
			});
			setAirportList(airports);
		};

	const handleRecipientDetails: SubmitHandler<FieldValues> = async () => {
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
			const location_id = generateID()
			setShipmentDetails({
				...shipmentDetails,
				shipment_heading_to: location_id,
				final_destination: {
					...shipmentDetails.final_destination,
					location_id:location_id,
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
			shipment_type: '',
			start_location: {
				location_id: '',
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
			recipient_phone_number: '',
			final_destination: {
				location_id: '',
				country: '',
				state: '',
				city: '',
				address: '',
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
			shipment_current_location: "",
			shipment_heading_to: "",
			shipment_addresses: [],
		};
		

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

		  console.log(state.shipmentDetails)

		let shipment_images = state.shipmentDetails.images as [];
		const { images, ...newPayload } = state.shipmentDetails;
		const payload = JSON.stringify(newPayload);
		console.log(state.shipmentDetails)
		const formData = new FormData();
		formData.append('payload', payload);
		for (let i = 0; i < shipment_images.length; i++) {
			formData.append('images', shipment_images[i]);
		}
		await createShipment(formData).then(
			(response) => {
				console.log(response);
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
				console.log(error);
				setShowLoader(false);
			}
		);
	};

	const getCountryCoveredMtd = () => {
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

		// GET ALL AIRPORTS
	useEffect(() => {
		fetchAirports(country?.name);
	}, [country, countryState]);

	// UPDATE THE GLOBAL STATE
	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
		// setState((prevState) => ({
		// 	...prevState,
		// 	shipmentDetails: {
		// 	  ...prevState.shipmentDetails,
		// 	  shipment_current_location: { ...prevState.shipmentDetails.start_location },
		// 	  shipment_heading_to: { ...prevState.shipmentDetails.final_destination },
		// 	},
		//   }));

		//   const newArr:any = []
		//   newArr.push(state.shipmentDetails.start_location)
		//   newArr.push(shipmentDetails.final_destination)

		  
		//   setState((prevState) => ({
		// 	...prevState,
		// 	shipmentDetails: {
		// 	  ...prevState.shipmentDetails,
		// 	  shipment_addresses: newArr,
		// 	},
		//   }));
	}, [shipmentDetails]);

	// GET LIST OF COUNTRIES COVERED BY CARGOLAND
	useEffect(() => {
		getCountryCoveredMtd();
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
		handleChangeAirport,
		airportList,
		airport,
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
