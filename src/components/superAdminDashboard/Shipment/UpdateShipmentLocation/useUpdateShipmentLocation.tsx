import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import { useGeocode } from '@/components';

function useUpdateShipmentLocation(singleShipmentId:string, setShowUpdateShipmentLocation: React.Dispatch<React.SetStateAction<boolean>>) {
	const { updateShipmentLocation } = ShipmentServices();
	const { fetchLocation } = useGeocode();
	const [showLoader, setShowLoader] = useState(false);
	const [shipmentCurrentLocation, setShipmentCurrentLocation] = useState<Record<string, string>>(
		{}
	);
	const [country, setCountry] = useState<any>({});
	const [countryState, setCountryState] = useState<any>({});
	const [stateCity, setStateCity] = useState<any>({});
	const [address, setAddress] = useState<string>('');

	const handleChangeCountry = (country: any) => {
		setShipmentCurrentLocation({})
			setCountry(country);
	};

	const handleChangeState = (state: any) => {
		setShipmentCurrentLocation({})
		setCountryState(state);
	};
	const handleChangeCity = (city: any) => {
		setShipmentCurrentLocation({})
		setStateCity(city);
	};
	const handleChangeAddress = (address: any) => {
		setShipmentCurrentLocation({})
		setAddress(address);
	};

		const generateID = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return (
			Array.from({ length: 3 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('') +
			Math.random().toString().substring(2, 6) +
			Date.now().toString().slice(-4)
		).substring(0, 9)
	}

	const getShipmentLocation = async (e: React.FormEvent<HTMLFormElement>) => {
		setShowLoader(true);
		e.preventDefault();
		fetchLocation(
			address + ', ' + stateCity.name + ', ' + countryState.name + ', ' + country.name
		).then(async(data) => {
			console.log(data);
			setShowLoader(false);
			if (data.results.length > 1) {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}

			const { lat, lng } = data.results[0].geometry.location;
			const newAddress = {
				location_id:generateID(),
				country: country,
				state: countryState,
				city: stateCity,
				address: address,
				formattedAddress: data.results[0].formatted_address,
				longitude: lng,
				latitude: lat,
			};
			console.log(newAddress)
			setShipmentCurrentLocation(newAddress);

		});
	};

const handleSetCurrentLocation =async()=>{
	setShowLoader(true);
	await updateShipmentLocation(singleShipmentId, shipmentCurrentLocation).then(
		(response) => {
			console.log(response);

			setShowLoader(false);
			toast.success('New Location Created', {
				progressClassName: 'bg-green-500 h-1',
				autoClose: 3000,
			});
			setShowUpdateShipmentLocation(false);
		},
		(error) => {
			console.log(error);
			setShowLoader(false);
		}
	);
}

	return {
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		getShipmentLocation,
		handleSetCurrentLocation,
		shipmentCurrentLocation,
		showLoader,
		address,
		stateCity,
		countryState,
		Country,
		country,
	};
}
export default useUpdateShipmentLocation;
