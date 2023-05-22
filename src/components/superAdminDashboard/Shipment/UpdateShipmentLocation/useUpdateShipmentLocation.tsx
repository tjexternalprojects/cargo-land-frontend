import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ShipmentServices } from '@/services';
import { Country } from 'country-state-city';
import { useGeocode } from '@/components';

function useUpdateShipmentLocation(){
	const { getCountryCovered } = ShipmentServices();

	const { fetchLocation } = useGeocode();
    const [showLoader, setShowLoader]=useState(false)
    const [shipmentCurrentLocation, setShipmentCurrentLocation] =useState<Record<string, string>>({})
    const [country, setCountry] = useState<any>({});
	const [countryState, setCountryState] = useState<any>({});
	const [stateCity, setStateCity] = useState<any>({});
	const [address, setAddress] = useState<string>('');
	const [countryCovered, setCountryCovered] = useState<Record<string, string>[]>([]);

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



    const handleChangeCountry = (country: any) => {

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
		setCountryState(state);
	};
	const handleChangeCity = (city: any) => {
		setStateCity(city);
	};
	const handleChangeAddress = (address: any) => {
		setAddress(address);
	};


const getShipmentLocation =(e:React.FormEvent<HTMLFormElement>)=>{
    setShowLoader(true)
    e.preventDefault()
    fetchLocation(
        address + ', ' + stateCity.name + ', ' + countryState.name + ', ' + country.name
    ).then((data) => {
        console.log(data)
        setShowLoader(false);
        if (data.results.length > 1) {
            toast.error(
                'Multiple address match please re-check your address, you can add local government area to be specific'
            );
            return;
        }

        const { lat, lng } = data.results[0].geometry.location;
const newAddress ={
                country: country,
                state: countryState,
                city: stateCity,
                address: address,
                formattedAddress: data.results[0].formatted_address,
                longitude: lng,
                latitude: lat,
}
      
setShipmentCurrentLocation(newAddress)
    });
}

    	// GET LIST OF COUNTRIES COVERED BY CARGOLAND
	useEffect(() => {
		getCounteryCovered();
	}, []);


    return {handleChangeCountry, handleChangeState, handleChangeCity, handleChangeAddress, getShipmentLocation, shipmentCurrentLocation, showLoader, address, stateCity, countryState, Country, country}
}
export default useUpdateShipmentLocation