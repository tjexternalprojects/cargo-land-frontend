import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import airportCodes from 'airport-codes';

function useNewShipmentForm() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showLoader, setShowLoader] = useState(false);
	const { fetchLocation } = useGeocode();
	const [previewImage, setPreviewImage] = useState<any>(state.shipmentDetails.previewImage);
	const { getCountryCovered } = ShipmentServices();

	// Current address
	const [country, setCountry] = useState<any>({});
	const [countryState, setCountryState] = useState<any>({});
	const [stateCity, setStateCity] = useState<any>({});
	const [address, setAddress] = useState<string>('');
	const [airportList, setAirportList] = useState<Record<string, string>[]>([]);
	const [airport, setAirport] = useState<any>({});
	const [countryCovered, setCountryCovered] = useState<Record<string, string>[]>([]);
	const [imageFullScreen, setImageFullScreen] = useState(false);

	// function to handle shipment data details
	interface StartLocation {
		location_id?: string;
		country: any;
		state: any;
		city: any;
		address: string;
		formattedAddress: string;
		longitude: number | null;
		latitude: number | null;
	}

	interface ShipmentDetails {
		shipment_title?: string;
		shipment_description?: string;
		shipment_weight?: string;
		previewImage?: string[];
		images?: any;
		shipment_type?: string;
		shipment_current_location?: string;
		start_location?: StartLocation;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({});

	const generateID = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		return (
			Array.from({ length: 3 }, () =>
				characters.charAt(Math.floor(Math.random() * characters.length))
			).join('') +
			Math.random().toString().substring(2, 6) +
			Date.now().toString().slice(-4)
		).substring(0, 9);
	};

	const resetInputs = () => {
		setShipmentDetails({
			...shipmentDetails,
			shipment_title: state.shipmentDetails?.shipment_title as string,
			shipment_description: state.shipmentDetails?.shipment_description as string,
			shipment_weight: state.shipmentDetails?.shipment_weight as string,
			previewImage: state.shipmentDetails?.previewImage,
			images: state.shipmentDetails?.images,
			shipment_type: state.shipmentDetails?.shipment_type as string,
			shipment_current_location: state.shipmentDetails?.shipment_current_location as string,
			start_location: {
				location_id: state.shipmentDetails?.start_location?.location_id,
				country: state.shipmentDetails?.start_location?.country,
				state: state.shipmentDetails?.start_location?.state,
				city: state.shipmentDetails?.start_location?.city,
				address: state.shipmentDetails?.start_location?.address as string,
				formattedAddress: state.shipmentDetails?.start_location?.formattedAddress as string,
				longitude: state.shipmentDetails?.start_location?.longitude as number,
				latitude: state.shipmentDetails?.start_location?.latitude as number,
			},
		});
		setPreviewImage(state.shipmentDetails.previewImage);
		setAddress(state.shipmentDetails?.start_location?.address);
		if (state.shipmentDetails?.start_location?.country !== '') {
			const getCountryDetails = Country.getCountryByCode(
				state.shipmentDetails?.start_location?.country?.isoCode
			);
			setCountry(getCountryDetails);
			setCountryState(state.shipmentDetails?.start_location?.state);
			setStateCity(state.shipmentDetails?.start_location?.city);
		} else {
			setCountry({});
		}
	};

	const resetShipmentStateOnChangeAddress = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item1',
			form_level: 0,
		});
		setShipmentDetails({
			...shipmentDetails,
			start_location: {
				...shipmentDetails.start_location,
				location_id: shipmentDetails.start_location?.location_id,
				country: country,
				state: countryState,
				city: stateCity,
				address: '',
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
		});
		setAddress('');
	};

	const handleChangeDeliveryType = (val: string) => {
		setShipmentDetails({
			...shipmentDetails,
			start_location: {
				...shipmentDetails.start_location,
				location_id: shipmentDetails.start_location?.location_id,
				country: {},
				state: {},
				city: {},
				address: '',
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
		});
		setCountry({});
		setAddress('');
		setShipmentDetails({
			...shipmentDetails,
			shipment_type: val,
		});
	};
	const handleChangeCountry = (country: any) => {
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
	const handleChangeCity = async (city: any) => {
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

	const handleSubmitNewShipmentForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowLoader(true);
		if (
			shipmentDetails.shipment_title == '' ||
			shipmentDetails.shipment_description == '' ||
			shipmentDetails.shipment_weight == '' ||
			// shipmentDetails.images?.length == 0 ||
			Object.keys(country).length === 0
		) {
			setShowLoader(false);
			toast.info('Please fill the important fields (*)', {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});

			setState({
				...state,
				shipmentCurrentTab: 'item1',
				form_level: 0,
			});

			return;
		}

		fetchLocation(
			address + ', ' + stateCity.name + ', ' + countryState.name + ', ' + country.name
		).then((data) => {
			setShowLoader(false);
			if (data.results.length > 1 && shipmentDetails.shipment_type === 'door_to_door') {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}
			const { lat, lng } = data.results[0].geometry.location;
			const location_id = generateID();
			setShipmentDetails({
				...shipmentDetails,
				shipment_current_location: location_id,
				start_location: {
					...shipmentDetails.start_location,
					location_id: location_id,
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

	const moveNext = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item2',
			form_level: 1,
		});
	};

	const handleImageScreenChange = (isFullScreen: any) => {
		setImageFullScreen(isFullScreen);
	};

	const removeImage = (indexToRemove: number) => {
		const newPreviewImage = [...previewImage];
		newPreviewImage.splice(indexToRemove, 1);
		setPreviewImage(newPreviewImage);
		if (shipmentDetails.images) {
			const newShipmentImages = [...shipmentDetails.images];
			newShipmentImages.splice(indexToRemove, 1);
			setShipmentDetails({ ...shipmentDetails, images: newShipmentImages });
		}
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
						images: [...prevDetails.images, file],
					}));

					setPreviewImage((prevImages: any) => [
						...prevImages,
						{
							original: dataUrl,
							thumbnail: dataUrl,
						},
					]);
				};
				reader.readAsDataURL(file);
			} else {
				toast.info('Please select an image file', {
					progressClassName: 'bg-blue-500 h-1',
					autoClose: 3000,
				});
			}
		}
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
		handleSubmitNewShipmentForm,
		setCountryState,
		setShipmentDetails,
		handleImageChange,
		removeImage,
		moveNext,
		setStateCity,
		setAddress,
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		handleChangeAirport,
		handleChangeDeliveryType,
		handleImageScreenChange,
		imageFullScreen,
		airportList,
		airport,
		state,
		stateCity,
		address,
		countryState,
		previewImage,
		showLoader,
		country,
		shipmentDetails,
	};
}
export default useNewShipmentForm;
