import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';

function useTrackShipment() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [trackingShipments, setTrackingShipment] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [singleShipment, setSingleShipment] = useState<any>([]);
	
	const getActiveShipment = async () => {
		setLoading(true);
		const active_shipment = state.allShipments.filter(
			(obj: any) => obj.shipment_Status == 'UNCHECK'
		);
		setTrackingShipment(active_shipment);
		setLoading(false);
	};

	const getInidividualShipment = (index: number) => {
		setSingleShipment(trackingShipments[index]);
	};

	useEffect(() => {
		getActiveShipment();
		getInidividualShipment(0);
	}, [state.allShipments]);

	useEffect(()=>{
		setSingleShipment(state.trackingShipments)
		console.log( singleShipment?.current_location?.longitude)
	},[state.trackingShipments])

	return { trackingShipments, singleShipment, getActiveShipment, getInidividualShipment };
}

export default useTrackShipment;
