import { useState, useEffect } from 'react';

interface Location {
	lat: number;
	lng: number;
}

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

const useGeocode = () => {
	const [location, setLocation] = useState<Location | null>(null);
	const [error, setError] = useState<any>(null);

	const fetchLocation = async (address: string) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					address
				)}&key=${GOOGLE_MAP_API_KEY}`
			);
			const data = await response.json();
			if (data.status === 'OK') {
				return data;
			} else {
				throw new Error(data.status);
			}
		} catch (error) {
			setError(error);
			return error;
		}
	};

	return { location, error, fetchLocation };
};

export default useGeocode;
