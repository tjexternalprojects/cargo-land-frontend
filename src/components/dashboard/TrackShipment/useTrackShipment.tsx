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

	const getIndividualShipmentMtd = (index: number) => {
		setSingleShipment(trackingShipments[index]);
	};

	useEffect(() => {
		getActiveShipment();
		getIndividualShipmentMtd(0);
	}, [state.allShipments]);

	useEffect(()=>{
		setSingleShipment(state.trackingShipments)
	},[state.trackingShipments])

	return { trackingShipments, singleShipment, getActiveShipment, getIndividualShipmentMtd };
}

export default useTrackShipment;
