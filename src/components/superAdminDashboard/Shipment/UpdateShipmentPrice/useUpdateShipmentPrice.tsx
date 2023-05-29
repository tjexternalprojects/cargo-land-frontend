import { ShipmentServices } from '@/services';
import { useState } from 'react';
import { toast } from 'react-toastify';

function useUpdateShipmentPrice(
	selectedShipment: any,
	setSelectedShipment: any,
    shipmentCurrentPrice:number,
	setShowUpdateShipmentPrice: React.Dispatch<React.SetStateAction<boolean>>
) {
	const { updateShipmentPrice } = ShipmentServices();
	const [price, setPrice] = useState<number>(shipmentCurrentPrice);
	const [loading, setLoading] = useState(false);

	const updateShipmentPriceMtd = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (price === 0) {
			toast.info("Amount can't be 0", {
				progressClassName: 'bg-blue-500 h-1',
				autoClose: 3000,
			});
			return;
		}
		setLoading(true);
		updateShipmentPrice(selectedShipment?.id, price).then(
			(response) => {
				console.log(response);
				setLoading(false);
				toast.success('Shipment price updated successfully', {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				setSelectedShipment((prevState:any) => ({
					...prevState,
					delivery_price:response.data.delivery_price,
				}));
				setShowUpdateShipmentPrice(false);
			},
			(error) => {
				console.log(error);
				setLoading(false);
			}
		);
	};
	return { price, loading, updateShipmentPriceMtd, setPrice };
}

export default useUpdateShipmentPrice;
