import React, { useContext, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { AppContext, AppContextType } from '@/context';
import { toast } from 'react-toastify';
import Geocode from 'react-geocode';
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
	const { fetchLocation} = useGeocode();
	const [showLoader, setShowLoader] = useState(false)

	interface ShipmentDetails {
		shipment_title: string;
		shipment_description: string;
		shipment_weight: number;
		images: (string | ArrayBuffer | null)[];
		current_location: Record<string, string | number>;
	}

	const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>({
		shipment_title: '',
		shipment_description: '',
		shipment_weight: 0,
		images: [],
		current_location: {
			country: '',
			state: '',
			city: '',
			address: '',
			longitude: 0,
			latitude: 0,
		},
	});

	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const removeImage = (indexToRemove: number) => {
		setShipmentDetails((prevState) => {
			const images = Array.isArray(prevState.images)
				? prevState.images.filter((image, index) => index !== indexToRemove)
				: [];
			return {
				...prevState,
				images,
			};
		});
	};

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, ...shipmentDetails },
		}));
	}, [shipmentDetails]);
	const handleSubmitNewShipmentForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowLoader(true)
		if (
			shipmentDetails.shipment_title == '' ||
			shipmentDetails.shipment_description == '' ||
			shipmentDetails.shipment_weight == 0 ||
			shipmentDetails.images.length == 0 ||
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

		await updateMapAddress();
		fetchLocation(mapAddress).then(data=>{
			console.log(data)
			setShowLoader(false)

				const { lat, lng } = data.results[0].geometry.location;
				setLatitude(lat)
				setLongitude(lng)
			setShipmentDetails({
				...shipmentDetails,
				current_location: {
					...shipmentDetails.current_location,
					country: Country.getCountryByCode(countryCode)?.name as string,
					state: State.getStateByCodeAndCountry(stateCode, countryCode)?.name as string,
					city: citySelected,
					address: address,
					longitude: longitude as unknown as number,
					latitude: latitude as unknown as number,
				},
			});
		})
		// 	setState({
		// 		...state,
		// 		shipmentCurrentTab: 'item2',
		// 	});
		// setState((prevState) => ({
		// 	...prevState,
		// 	shipmentDetails: { ...prevState.shipmentDetails, form_level: 1 },
		// }));

		// console.log(state)
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
						images: [...(prevDetails.images as (string | ArrayBuffer)[]), dataUrl],
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
		latitude,
		longitude,
		showLoader,
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
