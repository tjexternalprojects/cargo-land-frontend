import { useState, useEffect } from 'react';

interface Location {
	lat: number;
	lng: number;
}



const GOOGLE_MAP_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

const useGeocode = () => {
	const [location, setLocation] = useState<Location | null>(null);
	const [formattedAddress, setFormattedAddress] = useState('');
	const [error, setError] = useState<any>(null);

	// useEffect(() => {
		const fetchLocation = async (address: string) => {
			try {
				const response = await fetch(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
						address
					)}&key=${GOOGLE_MAP_API_KEY}`
				);
				const data = await response.json();
				// console.log(data.results[0].formatted_address);
				if (data.status === 'OK') {
          return data
					// const { lat, lng } = data.results[0].geometry.location;
					// setLocation({ lat, lng });
					// setFormattedAddress(data.results[0].formatted_address);
					// console.log(location);
				} else {
					throw new Error(data.status);
				}
			} catch (error) {
				setError(error);
        return error
			}
		};
		// fetchLocation(address);
	// }, [address]);

	return { location, error, fetchLocation };
};

export default useGeocode;
