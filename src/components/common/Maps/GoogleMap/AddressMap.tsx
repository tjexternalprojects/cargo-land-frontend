import { useEffect, useState, FC } from 'react';
import { useJsApiLoader, GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import useGeocode from './useGeocode';

const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

// const startLocation = { lng: 3.3119897, lat: 6.499183599999999 };

interface AddressMapProps {
	geoLocation: { lng: number; lat: number };
	formatted_address: string;
}

const AddressMap: FC<AddressMapProps> = ({ geoLocation, formatted_address }) => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [mapId, setMapId] = useState<string>(`map-${Math.random().toString(36).substring(2, 9)}`); // generate unique id
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_API_KEY,
		libraries: ['places'],
	});

	useEffect(() => {
		setMap(null);
		console.log(geoLocation);
		if (map) {
			console.log('located');
			new window.google.maps.Marker({
				position: geoLocation,
				map,
				title: formatted_address,
			});
		}
	}, [map]);
	// lat: 6.5049772;
	// lng: 3.3120209;
	return isLoaded ? (
		<GoogleMap
			center={geoLocation}
			zoom={16}
			id={mapId}
			mapContainerStyle={{ width: '100%', height: '40vh' }}
			options={{
				zoomControl: true,
				streetViewControl: true,
				mapTypeControl: true,
				fullscreenControl: true,
				mapTypeId: google.maps.MapTypeId.TERRAIN,
			}}
			onLoad={(map) => setMap(map)}
		></GoogleMap>
	) : (
		<div>Loading Google Maps API...</div>
	);
};

export default AddressMap;
