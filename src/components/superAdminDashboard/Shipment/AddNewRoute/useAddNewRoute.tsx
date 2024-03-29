import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import { useGeocode } from '@/components';

function useAddNewRoute(
	singleShipmentId: string,
	setSingleShipment: any,
	setShowUpdateShipmentLocation: React.Dispatch<React.SetStateAction<boolean>>
) {
	const { addNewLocation } = ShipmentServices();
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
		setShipmentCurrentLocation({});
		setCountry(country);
	};

	const handleChangeState = (state: any) => {
		setShipmentCurrentLocation({});
		setCountryState(state);
	};
	const handleChangeCity = (city: any) => {
		setShipmentCurrentLocation({});
		setStateCity(city);
	};
	const handleChangeAddress = (address: any) => {
		setShipmentCurrentLocation({});
		setAddress(address);
	};

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

	const getShipmentLocation = async (e: React.FormEvent<HTMLFormElement>) => {
		setShowLoader(true);
		e.preventDefault();
		fetchLocation(
			address + ', ' + stateCity.name + ', ' + countryState.name + ', ' + country.name
		).then(async (data) => {
			setShowLoader(false);
			if (data.results.length > 1) {
				toast.error(
					'Multiple address match please re-check your address, you can add local government area to be specific'
				);
				return;
			}

			const { lat, lng } = data.results[0].geometry.location;
			const newAddress = {
				location_id: generateID(),
				country: country,
				state: countryState,
				city: stateCity,
				address: address,
				formattedAddress: data.results[0].formatted_address,
				longitude: lng,
				latitude: lat,
			};
			setShipmentCurrentLocation(newAddress);
		});
	};

	const handleSetCurrentLocation = async () => {
		setShowLoader(true);
		await addNewLocation(singleShipmentId, shipmentCurrentLocation).then(
			(response) => {
				setShowLoader(false);
				setSingleShipment(response.data.shipment);
				toast.success(response.data.message, {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				setShowUpdateShipmentLocation(false);
			},
			(error) => {
				setShowLoader(false);
				toast.error(error.response.data.Error, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

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
export default useAddNewRoute;
