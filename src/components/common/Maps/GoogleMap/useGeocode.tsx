import { useState, useEffect } from 'react';

interface Location {
	lat: number;
	lng: number;
}

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

const useGeocode = () => {
	const [location, setLocation] = useState<Location | null>(null);
	const [error, setError] = useState<any>(null);

	const fetchLocation = async (payload?:Record<string, number>) => {
		console.log(payload)
		let url = ""
		// if(payload?.latitude){
			url =	`https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload?.latitude},${payload?.longitude}&key=${GOOGLE_MAP_API_KEY}`
				
		// }else{
		// 	url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address as string)}&key=${GOOGLE_MAP_API_KEY}`
		// }	
		try {
			const response = await fetch(url);
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
