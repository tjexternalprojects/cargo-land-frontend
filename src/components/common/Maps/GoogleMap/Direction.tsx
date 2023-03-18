import { FC, useEffect, useState } from 'react';
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	DirectionsRenderer,
	LoadScript,
} from '@react-google-maps/api';

const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

const startLocation = { lng: 3.3119897, lat: 6.499183599999999 };
const endLocation = { lng: 3.3120209, lat: 6.5049772 };

interface MapDirectionProps{
	height:string
}

const MapDirection: FC<MapDirectionProps> = ({height}) =>{
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [directionsResponse, setDirectionsResponse] = useState<null | google.maps.DirectionsResult>(
		null
	);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_API_KEY,
		libraries: ['places'],
	});

	async function calculateRoute() {
		const directionsService = new window.google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: startLocation,
			destination: endLocation,
			travelMode: window.google.maps.TravelMode.DRIVING,
		});
		setDirectionsResponse(results);
	}

	function clearRoute() {
		setDirectionsResponse(null);
	}

	useEffect(() => {
		if (isLoaded) {
			calculateRoute();
		}
	}, [isLoaded, startLocation, endLocation]);

	return isLoaded ? (
		<GoogleMap
			center={startLocation}
			zoom={10}
			mapContainerStyle={{ width: '100%', height }}
			options={{
				zoomControl: true,
				streetViewControl: true,
				mapTypeControl: true,
				fullscreenControl: true,
			}}
			onLoad={(map) => setMap(map)}
		>
			{map && <Marker position={startLocation} />}
			{map && <Marker position={endLocation} />}
			{directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
		</GoogleMap>
	) : (
		<div>Loading Google Maps API...</div>
	);
}

export default MapDirection;
