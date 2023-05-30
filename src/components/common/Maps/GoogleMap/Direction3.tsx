import { FC, useEffect, useState } from 'react';
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	DirectionsRenderer,
	Polyline,
} from '@react-google-maps/api';

const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

interface MapDirectionProps {
	height: string;
	startLocation: google.maps.LatLngLiteral;
	endLocation: google.maps.LatLngLiteral;
	middle_routes:any
}

type MapLibrary = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization';

const MAP_LIBRARIES: MapLibrary[] = ['places'];

const MapDirection: FC<MapDirectionProps> = ({
	height,
	startLocation,
	middle_routes,
	endLocation,
}) => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [directionsResponse, setDirectionsResponse] = useState<null | google.maps.DirectionsResult>(
		null
	);
	const [movingMarker, setMovingMarker] = useState<google.maps.Marker | null>(null);

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
			waypoints: [{ location: midLocation }],
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
	}, [isLoaded, startLocation, midLocation, endLocation]);

	useEffect(() => {
		if (map && directionsResponse) {
			if (movingMarker) {
				movingMarker.setMap(null); // Remove the previous moving marker from the map
			}

			const newMovingMarker = new window.google.maps.Marker({
				map,
				position: startLocation,
				icon: {
					path: window.google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
					scale: 5,
					fillColor: '#00f',
					fillOpacity: 1,
					strokeWeight: 0,
				},
				animation: window.google.maps.Animation.DROP,
			});

			setMovingMarker(newMovingMarker);

			const step = 100; // milliseconds
			const numSteps = directionsResponse.routes[0].overview_path.length;
			const resetIndex = Math.floor(numSteps / 2);
			let startIndex = resetIndex;
			let endIndex = numSteps;

			const animateMarker = () => {
				if (startIndex >= endIndex) {
					startIndex = resetIndex;
				}

				const nextPosition = directionsResponse.routes[0].overview_path[startIndex];
				newMovingMarker.setPosition(nextPosition);
				startIndex++;
				setTimeout(animateMarker, step);
			};

			animateMarker();
		}
	}, [map, directionsResponse, startLocation]);

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
			{/* {map && <Marker position={startLocation} />}
			{map && <Marker position={midLocation} />}
			{map && <Marker position={endLocation} />} */}

			{directionsResponse && (
				<>
					<DirectionsRenderer directions={directionsResponse} />
					<Marker
						position={startLocation}
						icon={{
							path: window.google.maps.SymbolPath.CIRCLE,
							fillColor: '#ff0000', // Change the color code to the desired color
							fillOpacity: 1,
							strokeWeight: 0,
							scale: 6,
						}}
					/>
					<Marker
						position={endLocation}
						icon={{
							path: window.google.maps.SymbolPath.CIRCLE,
							fillColor: '#00ff00', // Change the color code to the desired color
							fillOpacity: 1,
							strokeWeight: 0,
							scale: 6,
						}}
					/>
				</>
			)}
		</GoogleMap>
	) : (
		<div>Loading Google Maps API...</div>
	);
};

export default MapDirection;
