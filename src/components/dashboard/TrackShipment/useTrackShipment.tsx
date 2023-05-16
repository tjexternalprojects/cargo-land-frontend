import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';

function useTrackShipment() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [trackingShipments, setTrackingShipment] = useState<any>([])
	const [loading, setLoading] = useState(false)
	const [sindgleShipment, setSingleShipment]= useState<any>([])
	const getActiveShipment = async () => {
		setLoading(true)
		const active_shipment = state.allShipments.filter(
			(obj: any) => obj.shipment_Status == 'UNCHECK'
		);
		setTrackingShipment(active_shipment)
		setLoading(false)
	};

const getInidividualShipment =(index:number)=>{
	setSingleShipment(trackingShipments[index])
}

	useEffect(() => {
		getActiveShipment();
		getInidividualShipment;
	}, [loading]);


	return { trackingShipments, getActiveShipment , getInidividualShipment};
}

export default useTrackShipment;
