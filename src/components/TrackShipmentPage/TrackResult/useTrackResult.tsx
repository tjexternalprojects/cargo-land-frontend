import { useEffect, useState } from "react";

function useTrackResult(singleShipment:any) {
	const [currentLocation, setCurrentLocation] = useState<Record<string, number>>({});
	const [routeToLocation, setRouteToLocation] = useState<Record<string, number>>({});
	const generateLocationLabel = (index: number) => {
		let label = '';
		index++;

		while (index >= 0) {
			label = String.fromCharCode(65 + (index % 26)) + label;
			index = Math.floor(index / 26) - 1;
		}
		return label;
	};

	const GetUpdatedLatLong = (
		obj_location_id: string,
		stateToUpdate: (arg0: { lng: any; lat: any }) => void
	) => {
		const { start_location, final_destination, shipment_addresses } = singleShipment;

		const location_ids = {
			[start_location?.location_id]: start_location,
			[final_destination?.location_id]: final_destination,
			...shipment_addresses?.reduce((acc: any, address: any) => {
				acc[address.location_id] = address;
				return acc;
			}, {}),
		};

		// const location = location_ids[singleShipment?.shipment_current_location];
		const location = location_ids[obj_location_id];

		const coordinates = location
			? { lng: location?.longitude, lat: location?.latitude }
			: { lng: null, lat: null };
		stateToUpdate(coordinates);
	};



	useEffect(() => {
		singleShipment?.shipment_Status === 'TRANSIT' &&
			GetUpdatedLatLong(singleShipment?.shipment_current_location, setCurrentLocation);
	}, [singleShipment?.shipment_current_location]);

	useEffect(() => {
		singleShipment?.shipment_Status === 'TRANSIT' &&
			GetUpdatedLatLong(singleShipment?.shipment_heading_to, setRouteToLocation);
	}, [singleShipment?.shipment_heading_to]);

	return {
		currentLocation,
		routeToLocation,
		generateLocationLabel,
	};
}
export default useTrackResult