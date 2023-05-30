import { AppContextType, AppContext } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router-dom';
function useTrackShipment() {
	const { updateShipmentToTransit, getSingleShipment } = ShipmentServices();
	const params = useParams();
	const [singleShipment, setSingleShipment] = useState<any>({});
	const [showTrackingIdInput, setShowTrackingIdInput] = useState(false);
	const { setState } = useContext<AppContextType>(AppContext);
	const [showUpdateShipmentLocation, setShowUpdateShipmentLocation] = useState(false);
	const [loading, setLoading] = useState(false);

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
								console.log(response);
								setSingleShipment(response.data);
								setLoading(false);
							},
							(error) => {
								console.log(error);
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
				console.log(error);
				setShowTrackingIdInput(true);
				setLoading(false);
			}
		);
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
	return {
		singleShipment,
		showTrackingIdInput,
		loading,
		showUpdateShipmentLocation,
		setSingleShipment,
		handleSetOnTransit,
		setShowUpdateShipmentLocation,
		setShowTrackingIdInput,
	};
}

export default useTrackShipment;
