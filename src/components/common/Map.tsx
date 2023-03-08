import React, { useState, useEffect } from 'react';

interface Location {
	display_name: string;
	lat: string;
	lon: string;
}

interface NominatimExampleProps {
	latitude: string;
	longitude: string;
}

const NominatimExample: React.FC<NominatimExampleProps> = ({ latitude, longitude }) => {
	const [location, setLocation] = useState<Location | null>(null);

	useEffect(() => {
		const fetchLocation = async () => {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
			);
			const data = await response.json();
			setLocation(data);
		};

		fetchLocation();
	}, [latitude, longitude]);

	return (
		<div>
			{location ? (
				<>
					<p>{location.display_name}</p>
					<p>Latitude: {location.lat}</p>
					<p>Longitude: {location.lon}</p>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default NominatimExample;
