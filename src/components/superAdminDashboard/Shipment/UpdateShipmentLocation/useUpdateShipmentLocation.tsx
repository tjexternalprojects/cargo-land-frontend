import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import { useGeocode } from '@/components';

function useUpdateShipmentLocation(singleShipmentId:string) {
	const { getCountryCovered, updateShipment } = ShipmentServices();

	const { fetchLocation } = useGeocode();
	const [showLoader, setShowLoader] = useState(false);
	const [shipmentCurrentLocation, setShipmentCurrentLocation] = useState<Record<string, string>>(
		{}
	);
	const [country, setCountry] = useState<any>({});
	const [countryState, setCountryState] = useState<any>({});
	const [stateCity, setStateCity] = useState<any>({});
	const [address, setAddress] = useState<string>('');
	const [countryCovered, setCountryCovered] = useState<Record<string, string>[]>([]);

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

	const handleChangeCountry = (country: any) => {
		if (country) {
			const selectedCountry = countryCovered.some(
				(obj: Record<string, string>) => obj.name === country.name
			);

			if (selectedCountry === false) {
				toast.info("Sorry our services dosn't cover " + country.name + ' yet', {
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
		setCountryState(state);
	};
	const handleChangeCity = (city: any) => {
		setStateCity(city);
	};
	const handleChangeAddress = (address: any) => {
		setAddress(address);
	};

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
			await updateShipment(singleShipmentId, newAddress).then(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);
		});
	};

	// GET LIST OF COUNTRIES COVERED BY CARGOLAND
	useEffect(() => {
		getCountryCoveredMtd();
	}, []);

	return {
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		getShipmentLocation,
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
