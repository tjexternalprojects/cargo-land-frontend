import { FC, useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const GOOGLE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

interface AddressMapProps {
	address: string;
}

Geocode.setApiKey(GOOGLE_API_KEY);

const containerStyle = {
	width: '100%',
	height: '400px',
};

const AddressMap: FC<AddressMapProps> = ({ address }) => {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	const getAddressOnMap = () => {
		Geocode.fromAddress(address).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;
				setLatitude(lat);
				setLongitude(lng);
			},
			(error) => {
				console.error(error);
			}
		);
	};

	useEffect(() => {
		
		if (address !== '') {
			getAddressOnMap();
		}
	}, [address]);

	return (
		<div>

			{latitude && longitude && (
				<LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={{ lat: latitude, lng: longitude }}
						zoom={15}
						options={{
							disableDefaultUI: false,
							zoomControl: true,
							clickableIcons: false,
							mapTypeId: 'hybrid',
							streetViewControl: true,
							fullscreenControl: true,
							styles: [
								{
									featureType: 'poi',
									elementType: 'labels',
									stylers: [{ visibility: 'on' }],
								},
								{
									featureType: 'transit',
									elementType: 'labels',
									stylers: [{ visibility: 'on' }],
								},
							],
						}}
					>
						<Marker
							position={{ lat: latitude, lng: longitude }}
							icon={{
								url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
							}}
						/>
					</GoogleMap>
				</LoadScript>
			)}
		</div>
	);
};

export default AddressMap;
