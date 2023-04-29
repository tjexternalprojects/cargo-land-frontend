import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import { useGeocode } from '@/components';
function useNewShipmentForm() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [countryCode, setCountryCode] = useState('');
	const [stateCode, setStateCode] = useState('');
	const [citySelected, setCitySelected] = useState('');
	const [address, setAddress] = useState('');
	const [mapAddress, setMapAddress] = useState('');
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [showLoader, setShowLoader] = useState(false);
	const { fetchLocation } = useGeocode();
	const [previewImage, setPreviewImage] = useState<any>(state.shipmentDetails.images);

	interface CurrentLocation {
		country:  string,
		state: string,
		city:  string,
		address:  string,
		formattedAddress:  string,
		longitude:number,
		latitude: number,
	  }

	interface ShipmentDetails {
		shipment_title?: string;
		shipment_description?: string;
		shipment_weight?: string;
		images?:any;
		current_location?: CurrentLocation;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({});

	const resetInputs = ()=>{
		setShipmentDetails({...shipmentDetails, 
			shipment_title: state.shipmentDetails.shipment_title as string,
			shipment_description: state.shipmentDetails.shipment_description as string,
			shipment_weight: state.shipmentDetails.shipment_weight as string,
			images: state.shipmentDetails.images,
			current_location: {
				country: state.shipmentDetails.current_location.country as string,
				state: state.shipmentDetails.current_location.state as string,
				city: state.shipmentDetails.current_location.city as string,
				address: state.shipmentDetails.current_location.address as string,
				formattedAddress: state.shipmentDetails.current_location.formattedAddress as string,
				longitude: state.shipmentDetails.current_location.longitude as number,
				latitude: state.shipmentDetails.current_location.latitude as number,
			},
		})
		setPreviewImage(state.shipmentDetails.images)
		console.log(state.shipmentDetails.current_location.formattedAddress  )
	}

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

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
	}, [shipmentDetails]);
	const handleSubmitNewShipmentForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowLoader(true);
		if (
			shipmentDetails.shipment_title == '' ||
			shipmentDetails.shipment_description == '' ||
			shipmentDetails.shipment_weight == '' ||
			shipmentDetails.images?.length == 0 ||
			countryCode == '' ||
			countryCode == '0' ||
			stateCode == '' ||
			stateCode == '0' ||
			citySelected == '' ||
			citySelected == '0' ||
			address == ''
		) {
			setShowLoader(false);
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
			setShowLoader(false);
			if (data.results.length > 1) {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}

			const { lat, lng } = data.results[0].geometry.location;

			setLatitude(lat);
			setLongitude(lng);
			// setFormattedAddress(data.results[0].formatted_address);

			setShipmentDetails({
				...shipmentDetails,
				current_location: {
					...shipmentDetails.current_location,
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

	const moveNext = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item2',
			form_level: 1,
		});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0 ) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onloadend = () => {
					const dataUrl = reader.result;
					setShipmentDetails((prevDetails) => ({
						...prevDetails,
						images: [...prevDetails.images, file],
					}));
					setPreviewImage((prevImages:any) => [...prevImages, dataUrl]);
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
		// setShipmentDetails({
		// 	...shipmentDetails,
		// 	// current_location: {
		// 		...shipmentDetails.current_location,
		// 		// country: Country.getCountryByCode(countryCode)?.name as string,
		// 		// state: State.getStateByCodeAndCountry(stateCode, countryCode)?.name as string,
		// 		// city: citySelected,
		// 		// address: address,
		// 		formattedAddress:''
		// 		// longitude: lng,
		// 		// latitude: lat,
		// 	// },
		// });
		updateMapAddress();
	}, [address, citySelected, stateCode, countryCode]);

	useEffect(()=>{
		resetInputs()
	},[state.editShipment])
	return {
		countryCode,
		stateCode,
		address,
		citySelected,
		mapAddress,
		shipmentDetails,
		image_slider_settings,
		latitude,
		longitude,
		showLoader,
		previewImage,
		state,
		moveNext,
		removeImage,
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
