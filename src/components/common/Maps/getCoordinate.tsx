import {  useState } from 'react';

function coordinate() {
	const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

	const fetchLocation = async (address:string) => {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${address}&format=json`
		);
		const data = await response.json();
		if (data && data.length > 0) {
			setLocation({ latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) });
			return location;
		}
	};

	return { fetchLocation };
}
export default coordinate;
