import { FC, useEffect, useState } from 'react';
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	DirectionsRenderer,
	Polyline,
} from '@react-google-maps/api';
import { rippleLoader } from '@/assets';
const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

interface MapDirectionProps {
	height: string;
	startLocation: google.maps.LatLngLiteral;
	locations: any;
	endLocation: google.maps.LatLngLiteral;
	currentLocation: any;
	routeToLocation: any;
}

type MapLibrary = 'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization';

const MAP_LIBRARIES: MapLibrary[] = ['places'];

const MapDirection: FC<MapDirectionProps> = ({
	height,
	startLocation,
	locations,
	endLocation,
	currentLocation,
	routeToLocation,
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
			waypoints: locations.map((location: any) => ({
				location: {
					lat: location.latitude,
					lng: location.longitude,
				} as google.maps.LatLngLiteral,
				stopover: true,
			})),

			optimizeWaypoints: true,
			travelMode: window.google.maps.TravelMode.DRIVING,
		});
		setDirectionsResponse(results);
	}

	// function clearRoute() {
	// 	setDirectionsResponse(null);
	// }

	useEffect(() => {
		if (isLoaded) {
			calculateRoute();
		}
	}, [isLoaded, startLocation, locations, endLocation]);

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

			// CODE TO CALCULATE ROUTE TO, BASE ON THE CURRENT LOCATION AND THE NEXT DESTINATION ====================================================

			let startIndex = -1;
			let resetIndex = -1;
			let startMinDistance = Infinity;
			let endIndex = -1;
			let endMinDistance = Infinity;

			for (let i = 0; i < directionsResponse.routes[0].overview_path.length; i++) {
				const point = directionsResponse.routes[0].overview_path[i];

				const startDistance = Math.sqrt(
					Math.pow(point.lat() - currentLocation.lat, 2) +
						Math.pow(point.lng() - currentLocation.lng, 2)
				);

				if (startDistance < startMinDistance) {
					startIndex = i;
					resetIndex = i;
					startMinDistance = startDistance;
				}

				const endDistance = Math.sqrt(
					Math.pow(point.lat() - routeToLocation.lat, 2) +
						Math.pow(point.lng() - routeToLocation.lng, 2)
				);

				if (endDistance < endMinDistance) {
					endIndex = i;
					endMinDistance = endDistance;
				}
			}

			// END OF CODE TO CALCULATE ROUTE TO, BASE ON THE CURRENT LOCATION AND THE NEXT DESTINATION ====================================================

			// CODE TO DO THE ACTUAL ANIMATION
			const step = 100; // milliseconds

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
			{directionsResponse && (
				<>
					<DirectionsRenderer directions={directionsResponse} />
					<Marker position={currentLocation} icon={rippleLoader} />

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
