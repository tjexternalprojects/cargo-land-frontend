// import { useState } from 'react';
// import Geocode from 'react-geocode';
// import {
// 	GoogleMap,
// 	LoadScript,
// 	DirectionsService,
// 	DirectionsRenderer,
// } from '@react-google-maps/api';
// // import { DirectionsRenderer, DirectionsServiceStatus, TravelMode } from "google.maps";

// Geocode.setApiKey('AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA');

// const containerStyle = {
// 	width: '100%',
// 	height: '400px',
// };

// const MapDirection = () => {
// 	const [fromAddress, setFromAddress] = useState('');
// 	const [toAddress, setToAddress] = useState('');
// 	const [fromLatitude, setFromLatitude] = useState(null);
// 	const [fromLongitude, setFromLongitude] = useState(null);
// 	const [toLatitude, setToLatitude] = useState(null);
// 	const [toLongitude, setToLongitude] = useState(null);
// 	const [response, setResponse] = useState(null);

// 	const handleFromSubmit = (event: any) => {
// 		event.preventDefault();

// 		Geocode.fromAddress(fromAddress).then(
// 			(response) => {
// 				const { lat, lng } = response.results[0].geometry.location;
// 				setFromLatitude(lat);
// 				setFromLongitude(lng);
// 			},
// 			(error) => {
// 				console.error(error);
// 			}
// 		);
// 	};

// 	const handleToSubmit = (event: any) => {
// 		event.preventDefault();

// 		Geocode.fromAddress(toAddress).then(
// 			(response) => {
// 				const { lat, lng } = response.results[0].geometry.location;
// 				setToLatitude(lat);
// 				setToLongitude(lng);
// 			},
// 			(error) => {
// 				console.error(error);
// 			}
// 		);
// 	};

// 	const directionsCallback = (res: any) => {
// 		if (res !== null) {
// 			setResponse(res);
// 		}
// 	};

// 	return (
// 		<>
// 			<form onSubmit={handleFromSubmit}>
// 				<label>
// 					From:
// 					<input
// 						type="text"
// 						value={fromAddress}
// 						onChange={(event) => setFromAddress(event.target.value)}
// 					/>
// 				</label>
// 				<button type="submit">Get From Location</button>
// 			</form>
// 			<form onSubmit={handleToSubmit}>
// 				<label>
// 					To:
// 					<input
// 						type="text"
// 						value={toAddress}
// 						onChange={(event) => setToAddress(event.target.value)}
// 					/>
// 				</label>
// 				<button type="submit">Get To Location</button>
// 			</form>
// 			{fromLatitude && fromLongitude && toLatitude && toLongitude && (
// 				<LoadScript googleMapsApiKey="AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA">
// 					<GoogleMap
// 						mapContainerStyle={containerStyle}
// 						center={{ lat: fromLatitude, lng: fromLongitude }}
// 						zoom={10}
// 					>
// 						{response !== null && (
// 							<DirectionsRenderer
// 								options={{
// 									directions: response,
// 									suppressMarkers: true,
// 								}}
// 							/>
// 						)}
// 						<DirectionsService
// 							options={{
// 								origin: { lat: fromLatitude, lng: fromLongitude },
// 								destination: { lat: toLatitude, lng: toLongitude },
// 								travelMode: google.maps.TravelMode.DRIVING,
// 							}}
// 							callback={directionsCallback}
// 						/>
// 					</GoogleMap>
// 				</LoadScript>
// 			)}
// 		</>
// 	);
// };

// export default MapDirection;
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	Autocomplete,
	DirectionsRenderer,
  } from "@react-google-maps/api";
  import React,{ useRef, useState } from "react";

  const center = {
	lat: 7.8731,
	lng: 80.7718,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY,
});

const [map, setMap] = useState(null);
const [directionsResponse, setDirectionsResponse] = useState(null);
const originRef = useRef();
const destiantionRef = useRef();

<GoogleMap
    center={center}
    zoom={5}
    mapContainerStyle={{ width: "100%", height: "100vh" }}
    options={{
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }}
    onLoad={(map) => setMap(map)}
>
    <Marker position={center} />
</GoogleMap>