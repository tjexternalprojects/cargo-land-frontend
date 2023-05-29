import { AppContextType, AppContext } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function useTrackShipment() {
	const { getSingleShipment } = ShipmentServices();
	const params = useParams();
	const [singleShipment, setSingleShipment] = useState<any>({});
	const [showTrackingIdInput, setShowTrackingIdInput] = useState(false);
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showUpdateShipmentLocation, setShowUpdateShipmentLocation] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState();

	const SingleShipment = async () => {
		setLoading(true);
		await getSingleShipment(params.shipment_id as string).then(
			(response) => {
				setLoading(false);

				if(response.data === null){
				setShowTrackingIdInput(true);
				return
				}
				setSingleShipment(response.data);
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
		setShowUpdateShipmentLocation,
		setShowTrackingIdInput,
	};
}

export default useTrackShipment;
