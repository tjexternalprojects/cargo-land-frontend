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
	const [addressesCoordinate, setAddressesCordinate] = useState([])
	const [lastLabel, setLastLabel]= useState("")

	const generateLocationLabel = (index: number) => {
		let label = '';
		index++;
	  
		while (index >= 0) {
		  label = String.fromCharCode(65 + (index % 26)) + label;
		  index = Math.floor(index / 26) - 1;
		}

		// if(singleShipment?.shipment_addresses.length-1 == 1){

		// 	console.log(label)
		// 	// setLastLabel(label)
		// 	// console.log(lastLabel)
		// }
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
		addressesCoordinate,
		generateLocationLabel,
		setSingleShipment,
		handleSetOnTransit,
		setShowUpdateShipmentLocation,
		setShowTrackingIdInput,
	};
}

export default useTrackShipment;
