import { FC, useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

interface MapDirectionProps {
	height: string;
	startLocation: google.maps.LatLngLiteral;
	endLocation: google.maps.LatLngLiteral;
}

type MapLibrary = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization';

const MAP_LIBRARIES: MapLibrary[] = ['places'];

const MapDirection: FC<MapDirectionProps> = ({ height, startLocation, endLocation }) => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [directionsResponse, setDirectionsResponse] = useState<null | google.maps.DirectionsResult>(
		null
	);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_API_KEY,
		libraries: MAP_LIBRARIES,
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
};

export default MapDirection;
