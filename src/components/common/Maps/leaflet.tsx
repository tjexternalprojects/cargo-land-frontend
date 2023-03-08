import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
	address: string;
};

const Map: React.FC<Props> = ({ address }) => {
	const [position, setPosition] = useState<[number, number] | null>(null);

	useEffect(() => {
		axios
			.get(
				`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
					address
				)}&format=json&addressdetails=1&limit=1`
			)
			.then((response) => {
				console.log(response.data)
				const { lat, lon } = response.data[0];
				setPosition([parseFloat(lat), parseFloat(lon)]);
			});
	}, [address]);

	return (
		<MapContainer
			center={position ?? undefined}
			zoom={13}
			scrollWheelZoom={false}
			style={{ height: '400px', width: '100%' }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
			/>
			{position && (
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			)}
		</MapContainer>
	);
};


export default Map;
