import { useState } from 'react';
import { ShipmentServices } from '@/services';
import { toast } from 'react-toastify';
function useShipmentSearchBox(setSingleShipment: any) {
	const { trackShipment } = ShipmentServices();
	const [loading, setLoading] = useState(false);
	const [trackingID, setTrackingID] = useState('');
	const [secreteID, setSecreteID] = useState('');
	const handleTrackShipment = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		setLoading(true);
		const payload = {
			secreteID,
			trackingID,
		};
		trackShipment(payload).then(
			(response) => {
				setLoading(false);
				setSingleShipment(response.data);
                setTrackingID("");
                setSecreteID("");
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
	return { loading, trackingID, secreteID, handleTrackShipment, setTrackingID, setSecreteID };
}
export default useShipmentSearchBox;
