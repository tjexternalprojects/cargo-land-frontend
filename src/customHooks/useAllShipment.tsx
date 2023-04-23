import { useState, useEffect, useContext } from 'react';
import { ShipmentServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';

function useUAllShipment(loadVal: boolean | void) {
	const {getAllUserShipment} = ShipmentServices()
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const userShipments =  () => {
			setLoading(true);
			 getAllUserShipment()
		};
		userShipments();
	}, [loadVal]);

	return [loading, error];
}
export default useUAllShipment;
