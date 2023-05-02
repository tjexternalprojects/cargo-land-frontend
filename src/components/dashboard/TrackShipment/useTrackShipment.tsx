import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect } from 'react';

function useTrackShipment() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const getActiveShipment = async () => {
		const active_shipment = state.allShipments.filter(
			(obj: any) => obj.shipment_Status == 'TRANSIT'
		);
		console.log(state.allShipments);
		setState((prevState) => ({
			...prevState,
			trackingShipments: active_shipment,
		}));
	};
	useEffect(() => {
		getActiveShipment();
	}, [state.allShipments]);

	const currentItem = [
		{
			item_id: 'xxxxxx2',
			item_name: 'NEWWW',
			item_category: 'Electronics',
			item_total_weight: '500kg',
			item_quanity: '40',
			Item_description: 'dklaklklkdlkd',
			deleivery_price: 'N 5000',
			Item_images: ['img_1', 'img_2'],
		},
	];
	return { state };
}

export default useTrackShipment;
