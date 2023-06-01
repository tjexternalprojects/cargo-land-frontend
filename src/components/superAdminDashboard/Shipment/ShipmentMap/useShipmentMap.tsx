import { AppContextType, AppContext } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function useTrackShipment() {
	const { updateShipmentToTransit, updateShipmentToSuccessful, getSingleShipment } =
		ShipmentServices();
	const params = useParams();
	const [singleShipment, setSingleShipment] = useState<any>({});
	const [showTrackingIdInput, setShowTrackingIdInput] = useState(false);
	const { setState } = useContext<AppContextType>(AppContext);
	const [showUpdateShipmentLocation, setShowUpdateShipmentLocation] = useState(false);
	const [showShipmentSecrete, setShowShipmentSecrete] = useState(false);
	const [loading, setLoading] = useState(false);
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

	const handleSetOnTransit = (shipment_id: string) => {
		confirmAlert({
			title: 'Set Shipment on Transit?',
			message:
				'This Shipment is CHECKED but not on transit yet, do you want to set this shipment on transit',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setLoading(true);
						updateShipmentToTransit(shipment_id).then(
							(response) => {
								setSingleShipment(response.data);
								setLoading(false);
							},
							(error) => {
								setLoading(false);
							}
						);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	const SingleShipment = async () => {
		setLoading(true);
		await getSingleShipment(params.shipment_id as string).then(
			(response) => {
				setLoading(false);

				if (response.data === null) {
					setShowTrackingIdInput(true);
					return;
				}
				setSingleShipment(response.data);
				response.data.shipment_Status === 'CHECKED' &&
					handleSetOnTransit(params.shipment_id as string);
			},
			(error) => {
				setShowTrackingIdInput(true);
				setLoading(false);
			}
		);
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

	const setActivePage = () => {
		setState((prevState) => ({
			...prevState,
			activePage: 'Shipment',
		}));
	};

	useEffect(() => {
		setActivePage();
	}, []);

	useEffect(() => {
		SingleShipment();
	}, [params.shipment_id]);

	useEffect(() => {
		GetUpdatedLatLong(singleShipment?.shipment_current_location, setCurrentLocation);
	}, [singleShipment?.shipment_current_location]);

	useEffect(() => {
		GetUpdatedLatLong(singleShipment?.shipment_heading_to, setRouteToLocation);
	}, [singleShipment?.shipment_heading_to]);

	return {
		singleShipment,
		showTrackingIdInput,
		loading,
		showUpdateShipmentLocation,
		currentLocation,
		routeToLocation,
		showShipmentSecrete,
		setShowShipmentSecrete,
		generateLocationLabel,
		setSingleShipment,
		handleSetOnTransit,
		setShowUpdateShipmentLocation,
		setShowTrackingIdInput,
	};
}

export default useTrackShipment;
