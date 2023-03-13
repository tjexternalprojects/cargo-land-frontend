import { useEffect, useState } from 'react';
import './App.css';
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

// Latitude: 6.504008499999999, Longitude: 3.3119897
// Latitude: 6.5049772, Longitude: 3.3120209

function App() {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [directionsResponse, setDirectionsResponse] = useState<null | google.maps.DirectionsResult>(
		null
	);

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
		calculateRoute();
	}, [startLocation, endLocation]);
	return (
		<LoadScript
			googleMapsApiKey={GOOGLE_API_KEY}
			libraries={['places']} // add the libraries prop here
		>
			<GoogleMap
				center={startLocation}
				zoom={10}
				mapContainerStyle={{ width: '100%', height: '100vh' }}
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}
				onLoad={(map) => setMap(map)}
			>
				{map && <Marker position={startLocation} />}
				{map && <Marker position={endLocation} />}
				{directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
			</GoogleMap>
		</LoadScript>
	);
}

export default App;
