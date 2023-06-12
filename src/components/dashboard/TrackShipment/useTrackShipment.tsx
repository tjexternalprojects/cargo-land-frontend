import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';
import { ShipmentServices } from '@/services';
import { toast } from 'react-toastify';
function useTrackShipment() {
	const { getAllShipmentsParams } = ShipmentServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [allTransitShipment, setAllTransitShipment] = useState<any>([state.singleShipment]);
	const [loading, setLoading] = useState(false);
	const [singleShipment, setSingleShipment] = useState<any>(state.singleShipment);
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

	const getIndividualShipmentMtd = (shipment_index: number) => {
		setSingleShipment(allTransitShipment[shipment_index]);
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

	const getAllTransitShipment = () => {
		setLoading(true);
		getAllShipmentsParams('?shipment_status=TRANSIT').then(
			(response) => {
				setAllTransitShipment(response.data.allUserShipment);
				setLoading(false);
			},
			(error) => {
				setLoading(false);

				toast.error(error.response.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	useEffect(() => {
		singleShipment?.shipment_Status === 'TRANSIT' &&
			GetUpdatedLatLong(singleShipment?.shipment_current_location, setCurrentLocation);
	}, [singleShipment?.shipment_current_location]);

	useEffect(() => {
		singleShipment?.shipment_Status === 'TRANSIT' &&
			GetUpdatedLatLong(singleShipment?.shipment_heading_to, setRouteToLocation);
	}, [singleShipment?.shipment_heading_to]);

	useEffect(() => {
		if (Object.keys(state.singleShipment.length == 0)) {
			getAllTransitShipment();
		}
	}, []);
	return {
		singleShipment,
		currentLocation,
		routeToLocation,
		loading,
		allTransitShipment,
		generateLocationLabel,
		getIndividualShipmentMtd,
	};
}

export default useTrackShipment;
