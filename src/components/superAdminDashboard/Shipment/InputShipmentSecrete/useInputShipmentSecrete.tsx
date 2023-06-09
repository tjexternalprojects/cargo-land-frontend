import { ShipmentServices } from '@/services';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

function useUpdateShipmentPrice(
	setSingleShipment: any,
	singleShipmentId: string,
	setShowShipmentSecrete: React.Dispatch<React.SetStateAction<boolean>>
) {
	const { updateShipmentToSuccessful } = ShipmentServices();

	const [shipmentSecrete, setShipmentSecrete] = useState('');
	const [loading, setLoading] = useState(false);
	const handleSetShipmentSuccessful = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		confirmAlert({
			title: 'Set Shipment as Delivered?',
			message: 'Have you Confirm that this Shipment has been delivered?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setLoading(true);
						updateShipmentToSuccessful(singleShipmentId, shipmentSecrete).then(
							(response) => {
								setSingleShipment(response.data);
								setLoading(false);
								setShowShipmentSecrete(false);
								toast.success("Shipment delivery confirmed", {
									progressClassName: 'bg-green-500 h-1',
									autoClose: 3000,
								});
							},
							(error) => {
								setLoading(false);
								toast.info(error.response.data.message, {
									progressClassName: 'bg-red-500 h-1',
									autoClose: 3000,
								});
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

	return { handleSetShipmentSuccessful, setShipmentSecrete, shipmentSecrete, loading };
}

export default useUpdateShipmentPrice;
