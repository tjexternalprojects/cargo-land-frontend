import { useEffect, useState, FC } from 'react';
import { useJsApiLoader, GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import useGeocode from './useGeocode';

const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

const startLocation = { lng: 3.3119897, lat: 6.499183599999999 };

interface AddressMapProps {
	address: string;
}

const AddressMap: FC<AddressMapProps> = ({ address }) => {
	const { location, error } = useGeocode(address);
	console.log(location);

	const [map, setMap] = useState<google.maps.Map | null>(null);

	useEffect(() => {
		if (map) {
			const marker = new window.google.maps.Marker({
				position: startLocation,
				map,
				title: 'Start Location',
			});
		}
	}, [map]);

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
			></GoogleMap>
		</LoadScript>
	);
};

export default AddressMap;
