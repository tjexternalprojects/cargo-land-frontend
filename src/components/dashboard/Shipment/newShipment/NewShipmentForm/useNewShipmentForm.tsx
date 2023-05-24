import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import axios from 'axios';
import airportCodes from 'airport-codes';

function useNewShipmentForm() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showLoader, setShowLoader] = useState(false);
	const { fetchLocation } = useGeocode();
	const [previewImage, setPreviewImage] = useState<any>(state.shipmentDetails.images);
	const { getCountryCovered } = ShipmentServices();

	// Current address
	const [country, setCountry] = useState<any>({});
	const [countryState, setCountryState] = useState<any>({});
	const [stateCity, setStateCity] = useState<any>({});
	const [address, setAddress] = useState<string>('');
	const [countryCovered, setCountryCovered] = useState<Record<string, string>[]>([]);

	// function to handle shipment data details
	interface CurrentLocation {
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
		images?: any;
		shipment_type?: string;
		current_location?: CurrentLocation;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({});

	const resetInputs = () => {
		setShipmentDetails({
			...shipmentDetails,
			shipment_title: state.shipmentDetails.shipment_title as string,
			shipment_description: state.shipmentDetails.shipment_description as string,
			shipment_weight: state.shipmentDetails.shipment_weight as string,
			images: state.shipmentDetails.images,
			shipment_type: state.shipmentDetails.shipment_type as string,
			current_location: {
				country: state.shipmentDetails.current_location.country,
				state: state.shipmentDetails.current_location.state,
				city: state.shipmentDetails.current_location.city,
				address: state.shipmentDetails.current_location.address as string,
				formattedAddress: state.shipmentDetails.current_location.formattedAddress as string,
				longitude: state.shipmentDetails.current_location.longitude as number,
				latitude: state.shipmentDetails.current_location.latitude as number,
			},
		});
		setPreviewImage(state.shipmentDetails.images);
		setAddress(state.shipmentDetails.current_location.address);
		if (state.shipmentDetails.current_location.country !== '') {
			const getCountryDetails = Country.getCountryByCode(
				state.shipmentDetails.current_location.country?.isoCode
			);
			setCountry(getCountryDetails);
			setCountryState(state.shipmentDetails.current_location.state);
			setStateCity(state.shipmentDetails.current_location.city);
		} else {
			setCountry({});
		}
	};

	// Function to handle shipment images
	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
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

	const resetShipmentStateOnChangeAddress = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item1',
			form_level: 0,
		});
		setShipmentDetails({
			...shipmentDetails,
			current_location: {
				...shipmentDetails.current_location,
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
		console.log(state);
		resetShipmentStateOnChangeAddress();
		setCountryState(state);
	};
	const handleChangeCity = (city: any) => {
		resetShipmentStateOnChangeAddress();
		console.log(country)
		console.log(city)
		setStateCity(city);
	};
	const handleChangeAddress = (address: any) => {
		resetShipmentStateOnChangeAddress();
		setAddress(address);
	};

	const handleSubmitNewShipmentForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowLoader(true);
		if (
			shipmentDetails.shipment_title == '' ||
			shipmentDetails.shipment_description == '' ||
			shipmentDetails.shipment_weight == '' ||
			shipmentDetails.images?.length == 0 ||
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
			if (data.results.length > 1) {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}

			const { lat, lng } = data.results[0].geometry.location;

			setShipmentDetails({
				...shipmentDetails,
				current_location: {
					...shipmentDetails.current_location,
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

	// const fetchAirports = async (countryCode = 'NG', stateCode = 'LA') => {
	// 	try {
	// 		const response = await axios.get('http://api.aviationstack.com/v1/airports', {
	// 			params: {
	// 				access_key: import.meta.env.VITE_REACT_APP_AVIATIONSTACK_API,
	// 				country_name: countryCode,
	// 				state_name: stateCode,
	// 			},
	// 		});
	// 		console.log(response.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };




// const fetchAirports = async (countryCode='NG') => {
// 	try {
// 		const response = await axios.get(
// 			`https://api.openairportdata.com/v1/airports?country_iso2=NG`
// 		);

// 		const airports = response.data;
// 	console.log(airports)
// 	} catch (error) {
// 		console.log(error);
// 		return [];
// 	}
// };


const fetchAirports = async (countryCode = 'NG', stateCode = 'LA') => {
	// console.log(airportCodes)
	const airports = airportCodes.filter((airport: any) => {
		// return airport.attribute.country === countryCode && airport.state === stateCode;
		return airport.attributes.country === 'Nigeria' && airport.attributes.city === 'Lagos';
	});
	console.log(airports);
};

// 	 const fetchAirports = async (countryCode = 'NG', stateCode = 'LA') => {
// 			try {
// 				const response = await axios.get(
// 					'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
// 				);
		

// 				 const airportsData = response.data.split('\n');
// 					const filteredAirports = airportsData
// 						.filter((airport:any) => {
// 							const airportData = airport.split(',');
// 							return airportData[3].trim() === stateCode && airportData[2].trim() === countryCode;
// 						})
// 						.map((airport:any) => {
// 							const airportData = airport.split(',');
// 							return {
// 								name: airportData[1].trim(),
// 								city: airportData[2].trim(),
// 								state: airportData[3].trim(),
// 								country: airportData[4].trim(),
// 								iataCode: airportData[5].trim(),
// 								icaoCode: airportData[6].trim(),
// 							};
// 						});
// console.log(filteredAirports);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		};

	const moveNext = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item2',
			form_level: 1,
		});
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
					setPreviewImage((prevImages: any) => [...prevImages, dataUrl]);
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
		fetchAirports();
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
		state,
		stateCity,
		address,
		countryState,
		previewImage,
		showLoader,
		country,
		image_slider_settings,
		shipmentDetails,
	};
}
export default useNewShipmentForm;
